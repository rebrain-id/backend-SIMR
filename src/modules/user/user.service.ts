import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { selectedFieldUser, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, departmentUuid, isAdmin } = createUserDto;

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
          isAdmin,
        },
        select: selectedFieldUser(),
      });

      return result;
    } catch (error) {
      throw new HttpException('Failed create User', 500);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { username, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: { username },
      select: selectedFieldUser(),
    });

    if (!user) {
      throw new HttpException('Username or password is wrong', 400);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Username or password is wrong', 400);
    }

    try {
      return user;
    } catch (error) {
      throw new HttpException('Failed login User', 500);
    }
  }

  async findAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany({
      select: selectedFieldUser(),
    });

    if (result.length === 0) {
      throw new HttpException('User not found', 404);
    }

    try {
      return result;
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
    const { username, oldPassword, newPassword, departmentUuid, isAdmin } =
      updateUserDto;

    const user = await this.prisma.user.findUnique({
      where: { username: userUsername },
    });

    if (user.username === username) {
      throw new HttpException('User already exists', 404);
    } else if (!user) {
      throw new HttpException('User not found', 404);
    }

    const department = await this.prisma.department.findUnique({
      where: { uuid: departmentUuid },
    });

    if (!department) {
      throw new HttpException('Department not found', 404);
    }

    if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
      throw new HttpException('Old password is wrong', 400);
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    try {
      const result = await this.prisma.user.update({
        where: { username: userUsername },
        data: {
          username,
          password: newPasswordHash,
          departmentId: department.id,
          isAdmin,
        },
        select: selectedFieldUser(),
      });

      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new HttpException('Failed update User', 500);
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
