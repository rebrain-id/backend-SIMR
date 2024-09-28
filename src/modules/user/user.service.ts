import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { selectedFieldUser, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, departmentUuid } = createUserDto;

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
        },
        select: selectedFieldUser(),
      });

      return result;
    } catch (error) {
      throw new HttpException('Failed create User', 500);
    }
  }

  async findAll(query: {
    username?: string;
    department?: string;
    role?: Role;
    page?: number;
    limit?: number;
  }): Promise<{ result: User[]; totalData: number }> {
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

  async findOne(username: string): Promise<User> {
    const result = await this.prisma.user.findUnique({
      where: { username },
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

  async update(
    userUsername: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { username, oldPassword, newPassword, departmentUuid, role } =
      updateUserDto;

    const user = await this.prisma.user.findUnique({
      where: { username: userUsername },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (username && userUsername === username) {
      throw new HttpException('Username cannot be same', 400);
    }

    if (username && username !== user.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        throw new HttpException('Username already exists', 400);
      }
    }

    if (departmentUuid) {
      const department = await this.prisma.department.findUnique({
        where: { uuid: departmentUuid },
      });

      if (!department) {
        throw new HttpException('Department not found', 404);
      }
      user.departmentId = department.id;
    }

    if (oldPassword && newPassword) {
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        throw new HttpException('Old password is wrong', 400);
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (role) {
      user.role = role;
    }

    user.username = username || user.username;

    try {
      const updatedUser = await this.prisma.user.update({
        where: { username: userUsername },
        data: {
          username: user.username,
          password: user.password,
          departmentId: user.departmentId,
          role: user.role,
        },
        select: selectedFieldUser(),
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException('Failed to update User', 500);
    }
  }

  async remove(username: string): Promise<string> {
    const exists: User = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!exists) throw new HttpException('User not found', 404);

    try {
      await this.prisma.user.delete({
        where: { username },
      });
      return 'Success delete user with username: ' + username;
    } catch (error) {
      throw new HttpException('Failed delete User', 500);
    }
  }
}
