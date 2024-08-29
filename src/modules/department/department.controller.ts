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
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Success create department',
    type: 'Department',
    example: {
      statusCode: 201,
      message: 'Success create department',
      data: {
        uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
        name: 'Sastra Informatika',
        createdAt: '2024-08-29T15:48:02.661Z',
        updatedAt: '2024-08-29T15:48:02.661Z',
      },
    },
  })
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
  @ApiResponse({
    status: 200,
    description: 'Success get all departments',
    type: 'Department',
    example: {
      statusCode: 200,
      message: 'Success get all departments',
      data: [
        {
          uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
          name: 'Sastra Informatika',
          createdAt: '2024-08-29T15:48:02.661Z',
          updatedAt: '2024-08-29T15:48:02.661Z',
        },
        {
          uuid: 'c77dc43f-888e-4c60-8795-08660f95326b',
          name: 'Kimia Syariah',
          createdAt: '2024-08-29T15:55:30.638Z',
          updatedAt: '2024-08-29T15:55:30.638Z',
        },
      ],
    },
  })
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
  @ApiParam({ name: 'uuid', example: 'd1d8a267-365a-4556-8881-12aad8dbde63' })
  @ApiResponse({
    status: 200,
    description: 'Success get Department',
    type: 'Department',
    example: {
      statusCode: 200,
      message: 'Success get Department',
      data: {
        uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
        name: 'Sastra Informatika',
        createdAt: '2024-08-29T15:48:02.661Z',
        updatedAt: '2024-08-29T15:48:02.661Z',
      },
    },
  })
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
  @ApiParam({ name: 'uuid', example: 'd1d8a267-365a-4556-8881-12aad8dbde63' })
  @ApiResponse({
    status: 200,
    description: 'Success update department',
    type: 'Department',
    example: {
      statusCode: 200,
      message: 'Success update department',
      data: {
        uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
        name: 'Sastra Informatika',
        createdAt: '2024-08-29T15:48:02.661Z',
        updatedAt: '2024-08-29T15:48:02.661Z',
      },
    },
  })
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
  @ApiParam({ name: 'uuid', example: 'd1d8a267-365a-4556-8881-12aad8dbde63' })
  @ApiResponse({
    status: 200,
    description: 'Success delete department',
    type: 'Department',
    example: {
      statusCode: 200,
      message: 'Success delete department',
      data: 'Success delete Department with uuid: d1d8a267-365a-4556-8881-12aad8dbde63',
    },
  })
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
