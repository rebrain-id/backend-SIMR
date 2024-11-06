import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/modules/user/dto/login-user.dto';
import { Response } from 'src/helper/response';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';

@ApiTags('Auth')
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
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('FAKULTAS', 'PRODI')
  @Post('get-access')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<Response> {
    try {
      const result = await this.authService.refreshToken(refreshToken);
      return Response.success(HttpStatus.OK, 'Success get access', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed get access');
    }
  }

  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('FAKULTAS', 'PRODI')
  @Post('logout/:username')
  async logout(@Param('username') username: string): Promise<Response> {
    try {
      const result = await this.authService.logout(username);
      return Response.success(HttpStatus.OK, 'Success logout', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed logout');
    }
  }
}
