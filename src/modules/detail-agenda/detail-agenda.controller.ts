import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { DetailAgendaService } from './detail-agenda.service';
import { UpdateDetailAgendumDto } from './dto/update-detail-agendum.dto';
import { Response } from '../../helper/response';
import {
  DetailAgendum,
  DetailAgendums,
} from './entities/detail-agendum.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  createDetailAgendaDoc,
  findAllDetailAgendaDoc,
  findOneDetailAgendaDoc,
} from './doc/detail-agenda.doc';
import { FileUploadInterceptor } from './upload-service/upload.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';

@ApiTags('Detail Agenda')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PRODI')
@Controller('detail-agendas')
export class DetailAgendaController {
  constructor(private readonly detailAgendaService: DetailAgendaService) {}

  @Version('1')
  @Post()
  @ApiResponse(createDetailAgendaDoc())
  async create(@Body() createDetailAgendumDto: any): Promise<Response> {
    try {
      const result: DetailAgendums =
        await this.detailAgendaService.createDetailAgenda(
          createDetailAgendumDto,
        );
      return Response.success(
        HttpStatus.CREATED,
        'Success create detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed create detail agenda',
      );
    }
  }

  @Version('1')
  @Get('filter')
  async findAllDetailAgendaByFilter(
    @Query('username') username: string,
    @Query('start') start?: string,
    @Query('finish') finish?: string,
    @Query('type-agenda') typeAgenda?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<Response> {
    try {
      const result = await this.detailAgendaService.findAllDetailAgendaByFilter(
        username,
        start,
        finish,
        typeAgenda,
        skip,
        take,
      );
      return Response.success(
        HttpStatus.OK,
        'Success get all detail agenda',
        result.dataAgenda,
        result.total,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all detail agenda',
      );
    }
  }
  @Version('1')
  @Get()
  @ApiResponse(findAllDetailAgendaDoc())
  async findAllByDepartment(
    @Query('username') username: string,
  ): Promise<Response> {
    try {
      const result: DetailAgendums[] =
        await this.detailAgendaService.findAllByUserDepartment(username);
      return Response.success(
        HttpStatus.OK,
        'Success get all detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all detail agenda',
      );
    }
  }

  @Version('1')
  @Get('all')
  async findAllDetailAgenda(): Promise<Response> {
    try {
      const result = await this.detailAgendaService.findAllDetailAgenda();
      return Response.success(
        HttpStatus.OK,
        'Success get all detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all detail agenda',
      );
    }
  }

  @Version('1')
  @Get(':uuid')
  @ApiResponse(findOneDetailAgendaDoc())
  async findOneDetailAgenda(@Param('uuid') uuid: string): Promise<Response> {
    try {
      const result: DetailAgendum =
        await this.detailAgendaService.findOneDetailAgenda(uuid);
      return Response.success(
        HttpStatus.OK,
        'Success get detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get detail agenda',
      );
    }
  }

  @Version('1')
  @Patch(':uuid')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'absent',
          maxCount: 1,
        },
        {
          name: 'notulen',
          maxCount: 1,
        },
      ],
      new FileUploadInterceptor().createMulterOptions(),
    ),
  )
  async updateDetailAgenda(
    @Param('uuid') uuid: string,
    @Body() updateDetailAgendumDto: UpdateDetailAgendumDto,
    @UploadedFiles()
    files: {
      absent?: Express.Multer.File[];
      notulen?: Express.Multer.File[];
    },
  ): Promise<Response> {
    try {
      const result = await this.detailAgendaService.updateDetailAgenda(
        uuid,
        updateDetailAgendumDto,
        files,
      );
      return Response.success(
        HttpStatus.OK,
        'Success update detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed update detail agenda',
      );
    }
  }

  @Version('1')
  @Delete(':uuid')
  async removeDetailAgenda(@Param('uuid') uuid: string): Promise<Response> {
    try {
      const result: string =
        await this.detailAgendaService.removeDetailAgenda(uuid);
      return Response.success(
        HttpStatus.OK,
        'Success delete detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed delete detail agenda',
      );
    }
  }
}
