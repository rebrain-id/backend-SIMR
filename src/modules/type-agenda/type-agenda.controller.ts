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
  UseGuards,
} from '@nestjs/common';
import { TypeAgendaService } from './type-agenda.service';
import { CreateTypeAgendumDto } from './dto/create-type-agendum.dto';
import { UpdateTypeAgendumDto } from './dto/update-type-agendum.dto';
import { Response } from '../../helper/response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TypeAgenda } from './entities/type-agendum.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';

@ApiTags('Type Agenda')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PRODI')
@Controller('type-agendas')
export class TypeAgendaController {
  constructor(private readonly typeAgendaService: TypeAgendaService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Success create type agenda',
    type: TypeAgenda,
    example: {
      statusCode: 200,
      message: 'Success get all type agenda',
      data: {
        uuid: 'gjsdlfjdsflksj',
        name: 'Rapat Internal',
        createdAt: '2024-08-29T15:54:04.688Z',
        updatedAt: '2024-08-29T15:54:04.688Z',
      },
    },
  })
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
  @ApiResponse({
    status: 200,
    description: 'Success get all type agenda',
    type: [TypeAgenda],
    example: {
      statusCode: 200,
      message: 'Success get all type agenda',
      data: [
        {
          uuid: 'gjsdlfjdsflksj',
          name: 'Rapat Internal',
          createdAt: '2024-08-29T15:54:04.690Z',
          updatedAt: '2024-08-29T15:54:04.690Z',
        },
      ],
    },
  })
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
  @ApiResponse({
    status: 200,
    description: 'Success get type agenda',
    type: TypeAgenda,
    example: {
      statusCode: 200,
      message: 'Success get type agenda',
      data: {
        uuid: 'gjsdlfjdsflksj',
        name: 'Rapat Internal',
        createdAt: '2024-08-29T15:54:04.688Z',
        updatedAt: '2024-08-29T15:54:04.688Z',
      },
    },
  })
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
