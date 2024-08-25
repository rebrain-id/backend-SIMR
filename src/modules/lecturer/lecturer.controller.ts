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

@Controller('lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Version('1')
  @Post()
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
