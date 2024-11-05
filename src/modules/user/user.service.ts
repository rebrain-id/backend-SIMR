import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { selectedFieldUser, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { QueryUserDto } from './dto/query-user.dto';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, departmentUuid, jabatanValue } = createUserDto;

    const user = await this.prisma.user.findFirst({
      where: { username },
    });

    if (user) {
      throw new HttpException('User already exists', 400);
    }

    const department = await this.prisma.department.findUnique({
      where: { uuid: departmentUuid },
    });

    if (!department) {
      throw new HttpException('Department not found', 404);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const result = await this.prisma.user.create({
        data: {
          username,
          password: passwordHash,
          departmentId: department.id,
          jabatanValue: Number(jabatanValue),
        },
        select: selectedFieldUser(),
      });

      return result;
    } catch (error) {
      throw new HttpException('Failed create User', 500);
    }
  }

  async findAllUsers(
    query: QueryUserDto,
  ): Promise<{ result: User[]; totalData: number }> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const totalData = await this.prisma.user.count({
      where: {
        username: query.username
          ? { equals: query.username }
          : { contains: '' },
        department: query.department
          ? { name: { equals: query.department } }
          : { name: { contains: '' } },
        role: query.role
          ? { equals: (query.role as string).toUpperCase() as Role }
          : undefined,
      },
    });

    const result = await this.prisma.user.findMany({
      where: {
        username: query.username
          ? { equals: query.username }
          : { contains: '' },
        department: query.department
          ? { name: { equals: query.department } }
          : { name: { contains: '' } },
        role: query.role
          ? { equals: (query.role as string).toUpperCase() as Role }
          : undefined,
      },
      skip: offset,
      take: limit,
      select: selectedFieldUser(),
    });

    if (result.length === 0) {
      throw new HttpException('User not found', 404);
    }

    try {
      return { result, totalData };
    } catch (error) {
      throw new HttpException('Failed get all User', 500);
    }
  }

  async findOneUser(usernameParam: string): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: { username: usernameParam },
      select: selectedFieldUser(),
    });

    if (!result) {
      throw new HttpException('User not found', 404);
    }

    try {
      return result;
    } catch (error) {
      throw new HttpException('Failed get User', 500);
    }
  }

  async updateUser(
    usernameParam: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{
    user: Omit<User, 'id' | 'departmentId'>;
    access_token: string;
    refresh_token: string;
  }> {
    const { username, oldPassword, newPassword, departmentUuid, role } =
      updateUserDto;

    // Fetch existing user data by current username
    const user = await this.prisma.user.findUnique({
      where: { username: usernameParam },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    // Check if the new username is already taken by another user
    if (username && username !== user.username) {
      const userAvailable = await this.prisma.user.findUnique({
        where: { username },
      });

      if (userAvailable) {
        throw new HttpException('Username already exists', 400);
      }
    }

    // Update department if departmentUuid is provided
    if (departmentUuid) {
      const department = await this.prisma.department.findUnique({
        where: { uuid: departmentUuid },
      });

      if (!department) {
        throw new HttpException('Department not found', 404);
      }
      user.departmentId = department.id;
    }

    // Update password if both oldPassword and newPassword are provided
    if (oldPassword && newPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new HttpException('Old password is incorrect', 400);
      }
      user.password = await bcrypt.hash(newPassword, 10);
    } else if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      // If only one of the oldPassword or newPassword is provided, throw an error
      throw new HttpException(
        'Both old and new passwords are required to change the password',
        400,
      );
    }

    // Update role if provided
    if (role) {
      user.role = role;
    }

    // Update username if provided
    if (username) {
      user.username = username;
    }

    try {
      // Update user in database with modified data
      const updatedUser = await this.prisma.user.update({
        where: { username: usernameParam },
        data: {
          username: user.username,
          password: user.password,
          departmentId: user.departmentId,
          role: user.role,
        },
        include: {
          department: {
            select: {
              uuid: true,
              name: true,
            },
          },
        },
      });

      // Generate new tokens after update
      const token = await this.auth.generateTokens(updatedUser);

      // Exclude sensitive fields before returning the user object
      const { id, departmentId, ...userNoId } = updatedUser;

      return {
        user: userNoId,
        refresh_token: token.refresh_token,
        access_token: token.access_token,
      };
    } catch (error) {
      throw new HttpException('Failed to update user', 500);
    }
  }

  async removeUser(usernameParam: string): Promise<string> {
    const exists: User = await this.prisma.user.findUnique({
      where: { username: usernameParam },
    });

    if (!exists) throw new HttpException('User not found', 404);

    try {
      await this.prisma.user.delete({
        where: { username: usernameParam },
      });
      return 'Success delete user with username: ' + usernameParam;
    } catch (error) {
      throw new HttpException('Failed delete User', 500);
    }
  }
}
