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
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from '../../helper/response';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDocs } from './doc/user.doc';
import { QueryUserDto } from './dto/query-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse(UserDocs.register())
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

  @ApiResponse(UserDocs.findAll())
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRODI')
  @Get()
  async findAll(@Query() query: QueryUserDto) {
    try {
      const { result, totalData } = await this.userService.findAllUsers(query);
      return Response.success(
        HttpStatus.OK,
        'Success get all users',
        result,
        totalData,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all users',
      );
    }
  }

  @ApiResponse(UserDocs.findOne())
  @ApiParam(UserDocs.userParam())
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRODI')
  @Get(':username')
  async findOne(@Param('username') username: string) {
    try {
      const result = await this.userService.findOneUser(username);
      return Response.success(HttpStatus.OK, 'Success get user', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed get user');
    }
  }

  @ApiResponse(UserDocs.update())
  @ApiParam(UserDocs.userParam())
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRODI')
  @Patch(':username')
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    try {
      const result = await this.userService.updateUser(username, updateUserDto);
      return Response.success(HttpStatus.OK, 'Success update user', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed update user');
    }
  }

  @ApiResponse(UserDocs.remove())
  @ApiParam(UserDocs.userParam())
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRODI')
  @Delete(':username')
  async remove(@Param('username') username: string) {
    console.log(username);

    try {
      const result = await this.userService.removeUser(username);
      return Response.success(HttpStatus.OK, 'Success delete user', result);
    } catch (error) {
      throw Response.error(error.status, error.message || 'Failed delete user');
    }
  }
}
