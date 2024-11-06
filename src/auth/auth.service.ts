import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { department: true },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
        jabatanValue: user.jabatanValue,
        department: {
          uuid: user.department.uuid,
          name: user.department.name,
        },
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '90d',
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '90d',
      });

      const userId = await this.prisma.user.findUnique({
        where: { username },
        select: { id: true },
      });

      await this.prisma.refToken.create({
        data: {
          token: refreshToken,
          userId: userId.id,
        },
      });

      return {
        refresh_token: refreshToken,
        access_token: accessToken,
      };
    }

    throw new HttpException('Invalid username or password', 401);
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_SECRET_KEY,
    });

    const storedToken = await this.prisma.refToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.userId !== decoded.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = await this.jwtService.signAsync(decoded, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '5m',
    });

    return {
      access_token: newAccessToken,
    };
  }

  async generateTokens(
    data: any,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const department = await this.prisma.department.findUnique({
      where: { id: data.departmentId },
    });

    const payload = {
      username: data.username,
      sub: data.id,
      role: data.role,
      jabatanValue: data.jabatanValue,
      department: {
        uuid: department.uuid,
        name: department.name,
      },
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '5m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '30d',
    });

    // Hapus semua refresh token milik user terlebih dahulu
    await this.prisma.refToken.deleteMany({
      where: { userId: data.id },
    });

    // Buat refresh token baru
    await this.prisma.refToken.create({
      data: {
        token: refreshToken,
        userId: data.id,
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async logout(username: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    const result = await this.prisma.refToken.deleteMany({
      where: { userId: user.id },
    });

    try {
      if (result.count === 0) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return `Success logout`;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
