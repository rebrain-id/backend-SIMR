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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Response } from '../../helper/response';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Version('1')
  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Response> {
    try {
      const result = await this.departmentService.create(createDepartmentDto);
      return Response.success(
        HttpStatus.CREATED,
        'Success create department',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed create department',
      );
    }
  }

  @Version('1')
  @Get()
  async findAll(): Promise<Response> {
    try {
      const result = await this.departmentService.findAll();
      return Response.success(
        HttpStatus.OK,
        'Success get all departments',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all departments',
      );
    }
  }

  @Version('1')
  @Get(':uuid')
  async findOne(@Param('uuid') id: string) {
    try {
      const result = await this.departmentService.findOne(id);
      return Response.success(HttpStatus.OK, 'Success get department', result);
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get department',
      );
    }
  }

  @Version('1')
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Response> {
    try {
      const result = await this.departmentService.update(
        uuid,
        updateDepartmentDto,
      );
      return Response.success(
        HttpStatus.OK,
        'Success update department',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed update department',
      );
    }
  }

  @Version('1')
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    try {
      const result = await this.departmentService.remove(uuid);
      return Response.success(
        HttpStatus.OK,
        'Success delete department',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed delete department',
      );
    }
  }
}
