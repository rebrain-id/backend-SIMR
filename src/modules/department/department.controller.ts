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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Response } from '../../helper/response';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepartmentDocs } from './doc/department.doc';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { QueryDepartmentDto } from './dto/query-department.dto';

@ApiTags('Department')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PRODI')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Version('1')
  @Post()
  @ApiResponse(DepartmentDocs.createResponse())
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Response> {
    try {
      const result =
        await this.departmentService.createDepartment(createDepartmentDto);
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
  @ApiResponse(DepartmentDocs.findAllResponse())
  async findAll(@Query() query: QueryDepartmentDto): Promise<Response> {
    try {
      const { result, totalData } =
        await this.departmentService.findAllDepartment(query);
      return Response.success(
        HttpStatus.OK,
        'Success get all departments',
        result,
        totalData,
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
  @ApiParam(DepartmentDocs.params())
  @ApiResponse(DepartmentDocs.findOneResponse())
  async findOne(@Param('uuid') uuid: string) {
    try {
      const result = await this.departmentService.findOneDepartment(uuid);
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
  @ApiParam(DepartmentDocs.params())
  @ApiResponse(DepartmentDocs.updateResponse())
  async update(
    @Param('uuid') uuid: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Response> {
    try {
      const result = await this.departmentService.updateDepartment(
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
  @ApiParam(DepartmentDocs.params())
  @ApiResponse(DepartmentDocs.deleteResponse())
  async remove(@Param('uuid') uuid: string) {
    try {
      const result = await this.departmentService.removeDepartment(uuid);
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
