import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { Response } from '../../helper/response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAgendaDto } from './dto/check-agenda.dto';
import { checkExistAgenda } from './doc/agenda.doc';

@ApiTags('Agenda')
@Controller('agendas')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @HttpCode(HttpStatus.OK)
  @Version('1')
  @Post('check')
  @ApiResponse(checkExistAgenda())
  async checkExistAgenda(@Body() checkAgendaDto: CheckAgendaDto) {
    try {
      const result = await this.agendaService.checkExistAgenda(checkAgendaDto);
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
