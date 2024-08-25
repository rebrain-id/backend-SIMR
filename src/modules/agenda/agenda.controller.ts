import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Response } from '../../helper/response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Agenda')
@Controller('agendas')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Version('1')
  @Post('check')
  async checkExistAgenda(@Body() createAgendaDto: CreateAgendaDto) {
    try {
      const result = await this.agendaService.checkExistAgenda(createAgendaDto);
      return Response.success(
        HttpStatus.OK,
        'Success check exist agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed check exist agenda',
      );
    }
  }

  @Version('1')
  @Post()
  async create(@Body() createAgendaDto: CreateAgendaDto) {
    try {
      const result = await this.agendaService.create(createAgendaDto);
      return Response.success(
        HttpStatus.CREATED,
        'Success create agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed create agenda',
      );
    }
  }

  @Version('1')
  @Get()
  async findAll() {
    try {
      const result = await this.agendaService.findAll();
      return Response.success(HttpStatus.OK, 'Success get all agenda', result);
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all agenda',
      );
    }
  }
}
