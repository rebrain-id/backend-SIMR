import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { Response } from '../../helper/response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAgendaDto } from './dto/check-agenda.dto';
import { checkExistAgenda } from './doc/agenda.doc';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';

@ApiTags('Agenda')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PRODI', 'FAKULTAS')
@Controller('agendas')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Version('1')
  @Get('filter')
  async findAllDepartmentAgendaByFilter(
    @Query() query: { departmentUuid?: string; detailAgendaUuid?: string },
  ) {
    try {
      const result = await this.agendaService.findAllDepartmentAgenda(query);
      return Response.success(HttpStatus.OK, 'Success get all agenda', result);
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all agenda',
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Version('1')
  @Post('check')
  @ApiResponse(checkExistAgenda())
  async checkExistAgendaDepartmentAgenda(
    @Body() checkAgendaDto: CheckAgendaDto,
  ) {
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
  @Post('check-update')
  async checkForUpdateDepartmentAgenda(@Body() checkAgendaDto: any) {
    try {
      const result =
        await this.agendaService.checkExistDepartmentAgendaForUpdate(
          checkAgendaDto,
        );
      return Response.success(
        HttpStatus.OK,
        'Success check exist agenda',
        result,
      );
    } catch (error) {
      console.log(error);
      throw Response.error(
        error.status,
        error.message || 'Failed create agenda',
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
}
