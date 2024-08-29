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
import { LecturerService } from './lecturer.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import { Response } from '../../helper/response';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Lecturer')
@Controller('lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Success create new lecturer',
    type: 'Lecturer',
    example: {
      statusCode: 201,
      message: 'Success create lecturer',
      data: {
        uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
        name: 'Sang Surya',
        email: 'sangsurya@gmail.com',
        phoneNumber: '08123456789',
        department: {
          uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
          name: 'Sastra Informatika',
        },
        createdAt: '2024-08-29T16:38:09.714Z',
        updatedAt: '2024-08-29T16:38:09.714Z',
      },
    },
  })
  async create(
    @Body() createLecturerDto: CreateLecturerDto,
  ): Promise<Response> {
    try {
      const result = await this.lecturerService.create(createLecturerDto);
      return Response.success(
        HttpStatus.CREATED,
        'Success create lecturer',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed create lecturer',
      );
    }
  }

  @Version('1')
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success get all lecturers',
    type: 'Lecturer',
    example: {
      statusCode: 200,
      message: 'Success get all lecturers',
      data: [
        {
          uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
          name: 'Sang Surya',
          email: 'sangsurya@gmail.com',
          phoneNumber: '08123456789',
          department: {
            uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
            name: 'Sastra Informatika',
          },
          createdAt: '2024-08-29T16:38:09.714Z',
          updatedAt: '2024-08-29T16:41:41.648Z',
        },
        {
          uuid: 'cb3c7074-d657-446e-b115-86a00baf8294',
          name: 'Kampus Biru',
          email: 'kampusbiru@gmail.com',
          phoneNumber: '123456789',
          department: {
            uuid: 'c77dc43f-888e-4c60-8795-08660f95326b',
            name: 'Kimia Syariah',
          },
          createdAt: '2024-08-29T16:46:33.297Z',
          updatedAt: '2024-08-29T16:46:33.297Z',
        },
      ],
    },
  })
  async findAll(): Promise<Response> {
    try {
      const result = await this.lecturerService.findAll();
      return Response.success(
        HttpStatus.OK,
        'Success get all lecturers',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all lecturers',
      );
    }
  }

  @Version('1')
  @Get(':uuid')
  @ApiParam({ name: 'uuid', example: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2' })
  @ApiResponse({
    status: 200,
    description: 'Success get lecturer',
    type: 'Lecturer',
    example: {
      statusCode: 200,
      message: 'Success get lecturer',
      data: {
        uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
        name: 'Sang Surya',
        email: 'sangsurya@gmail.com',
        phoneNumber: '08123456789',
        department: {
          uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
          name: 'Sastra Informatika',
        },
        createdAt: '2024-08-29T16:38:09.714Z',
        updatedAt: '2024-08-29T16:41:41.648Z',
      },
    },
  })
  async findOne(@Param('uuid') uuid: string) {
    try {
      const result = await this.lecturerService.findOne(uuid);
      return Response.success(HttpStatus.OK, 'Success get lecturer', result);
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get lecturer',
      );
    }
  }

  @Version('1')
  @Patch(':uuid')
  @ApiParam({ name: 'uuid', example: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2' })
  @ApiResponse({
    status: 200,
    description: 'Success update lecturer',
    type: 'Lecturer',
    example: {
      statusCode: 200,
      message: 'Success update lecturer',
      data: {
        uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
        name: 'Sang Surya',
        email: 'sangsurya@gmail.com',
        phoneNumber: '08123456789',
        department: {
          uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
          name: 'Sastra Informatika',
        },
        createdAt: '2024-08-29T16:38:09.714Z',
        updatedAt: '2024-08-29T16:38:09.714Z',
      },
    },
  })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateLecturerDto: UpdateLecturerDto,
  ) {
    try {
      const result = await this.lecturerService.update(uuid, updateLecturerDto);
      return Response.success(HttpStatus.OK, 'Success update lecturer', result);
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed update lecturer',
      );
    }
  }

  @Version('1')
  @Delete(':uuid')
  @ApiParam({ name: 'uuid', example: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2' })
  @ApiResponse({
    status: 200,
    description: 'Success delete lecturer',
    type: 'Lecturer',
    example: {
      statusCode: 200,
      message: 'Success delete lecturer',
      data: 'Success delete Lecturer with uuid: 7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
    },
  })
  async remove(@Param('uuid') uuid: string) {
    try {
      const result = await this.lecturerService.remove(uuid);
      return Response.success(HttpStatus.OK, 'Success delete lecturer', result);
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed delete lecturer',
      );
    }
  }
}
