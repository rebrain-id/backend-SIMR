import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from '../../helper/response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<Response> {
    try {
      const result = await this.userService.register(createUserDto);
      return Response.success(
        HttpStatus.CREATED,
        'Success create user',
        result,
      );
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed create user');
    }
  }

  @Version('1')
  @Get()
  async findAll() {
    try {
      const result = await this.userService.findAll();
      return Response.success(HttpStatus.OK, 'Success get all users', result);
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all users',
      );
    }
  }

  @Version('1')
  @Get(':username')
  async findOne(@Param('username') username: string) {
    try {
      const result = await this.userService.findOne(username);
      return Response.success(HttpStatus.OK, 'Success get user', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed get user');
    }
  }

  @Version('1')
  @Patch(':username')
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    try {
      const result = await this.userService.update(username, updateUserDto);
      return Response.success(HttpStatus.OK, 'Success update user', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed update user');
    }
  }

  @Version('1')
  @Delete(':username')
  async remove(@Param('username') username: string) {
    try {
      const result = await this.userService.remove(username);
      return Response.success(HttpStatus.OK, 'Success delete user', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed delete user');
    }
  }
}
