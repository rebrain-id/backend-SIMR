import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Version,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/modules/user/dto/login-user.dto';
import { Response } from 'src/helper/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<Response> {
    try {
      const result = await this.authService.login(
        loginUserDto.username,
        loginUserDto.password,
      );

      return Response.success(HttpStatus.OK, 'Success login', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed login');
    }
  }

  @Version('1')
  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<Response> {
    try {
      const result = await this.authService.refreshToken(refreshToken);
      return Response.success(HttpStatus.OK, 'Success refresh token', result);
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed refresh token',
      );
    }
  }

  @Version('1')
  @Post('logout/:userId')
  async logout(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Response> {
    try {
      const result = await this.authService.logout(userId);
      return Response.success(HttpStatus.OK, 'Success logout', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed logout');
    }
  }
}
