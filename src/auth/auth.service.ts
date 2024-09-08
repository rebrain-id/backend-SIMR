import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { id, password, ...result } = user;

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
        expiresIn: '7d',
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
        ...result,
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
    const user = await this.userService.findOne(username);

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
