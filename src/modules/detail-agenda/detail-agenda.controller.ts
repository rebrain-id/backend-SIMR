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
import { DetailAgendaService } from './detail-agenda.service';
import { CreateDetailAgendumDto } from './dto/create-detail-agendum.dto';
import { UpdateDetailAgendumDto } from './dto/update-detail-agendum.dto';
import { Response } from '../../helper/response';
import { DetailAgendum } from './entities/detail-agendum.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Detail Agenda')
@Controller('detail-agendas')
export class DetailAgendaController {
  constructor(private readonly detailAgendaService: DetailAgendaService) {}

  @Version('1')
  @Post()
  async create(
    @Body() createDetailAgendumDto: CreateDetailAgendumDto,
  ): Promise<Response> {
    try {
      const result: DetailAgendum = await this.detailAgendaService.create(
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
  @Get()
  async findAll(): Promise<Response> {
    try {
      const result: DetailAgendum[] = await this.detailAgendaService.findAll();
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
  async findOne(@Param('uuid') uuid: string): Promise<Response> {
    try {
      const result: DetailAgendum =
        await this.detailAgendaService.findOne(uuid);
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
  async update(
    @Param('uuid') uuid: string,
    @Body() updateDetailAgendumDto: UpdateDetailAgendumDto,
  ): Promise<Response> {
    try {
      const result: DetailAgendum = await this.detailAgendaService.update(
        uuid,
        updateDetailAgendumDto,
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
  async remove(@Param('uuid') uuid: string): Promise<Response> {
    try {
      const result: string = await this.detailAgendaService.remove(uuid);
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
