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
import { TypeAgendaService } from './type-agenda.service';
import { CreateTypeAgendumDto } from './dto/create-type-agendum.dto';
import { UpdateTypeAgendumDto } from './dto/update-type-agendum.dto';
import { Response } from '../../helper/response';

@Controller('type-agendas')
export class TypeAgendaController {
  constructor(private readonly typeAgendaService: TypeAgendaService) {}

  @Version('1')
  @Post()
  async create(
    @Body() createTypeAgendumDto: CreateTypeAgendumDto,
  ): Promise<Response> {
    try {
      const result = await this.typeAgendaService.create(createTypeAgendumDto);
      return Response.success(
        HttpStatus.CREATED,
        'Success create type agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed create type agenda',
      );
    }
  }

  @Version('1')
  @Get()
  async findAll(): Promise<Response> {
    try {
      const result = await this.typeAgendaService.findAll();
      return Response.success(
        HttpStatus.OK,
        'Success get all type agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all type agenda',
      );
    }
  }

  @Version('1')
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<Response> {
    try {
      const result = await this.typeAgendaService.findOne(uuid);
      return Response.success(HttpStatus.OK, 'Success get type agenda', result);
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get type agenda',
      );
    }
  }

  @Version('1')
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateTypeAgendumDto: UpdateTypeAgendumDto,
  ): Promise<Response> {
    try {
      const result = await this.typeAgendaService.update(
        uuid,
        updateTypeAgendumDto,
      );
      return Response.success(
        HttpStatus.OK,
        'Success update type agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed update type agenda',
      );
    }
  }

  @Version('1')
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    try {
      const result = await this.typeAgendaService.remove(uuid);
      return Response.success(
        HttpStatus.OK,
        'Success delete type agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed delete type agenda',
      );
    }
  }
}
