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

@ApiTags('Agenda')
@Controller('agendas')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @HttpCode(HttpStatus.OK)
  @Version('1')
  @Post('check')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CheckAgendaDto,
    example: {
      statusCode: 200,
      message: 'Success check exist agenda',
      data: [
        {
          status: 'conflict schedule',
          lecturerUuid: '318dafdf-fdca-4a76-8042-e781e02d9b3f',
          name: 'Tiffany Zieme',
          detailAgendaUuid: '09de4ce7-9acc-4d57-a86d-7a81deb98e40',
          titleAgenda: 'Rapat Paripurna testing brp ini suksesss harusnya',
          start: '2024-05-20T05:00:00.000Z',
          finish: '2024-06-20T06:30:00.000Z',
        },
        {
          status: 'conflict schedule',
          lecturerUuid: '3a93ca1d-8ced-4096-b17e-297601490928',
          name: 'Daniel Volkman',
          detailAgendaUuid: '09de4ce7-9acc-4d57-a86d-7a81deb98e40',
          titleAgenda: 'Rapat Paripurna testing brp ini suksesss harusnya',
          start: '2024-05-20T05:00:00.000Z',
          finish: '2024-06-20T06:30:00.000Z',
        },
      ],
    },
  })
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
