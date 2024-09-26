import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '15m',
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '30d',
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

    throw new UnauthorizedException();
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

    const payload = {
      username: decoded.username,
      sub: decoded.sub,
      role: decoded.role,
    };

    const newAccessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '15m',
    });

    return {
      access_token: newAccessToken,
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
