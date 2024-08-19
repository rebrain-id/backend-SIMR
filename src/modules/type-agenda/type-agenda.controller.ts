import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeAgendaService } from './type-agenda.service';
import { CreateTypeAgendumDto } from './dto/create-type-agendum.dto';
import { UpdateTypeAgendumDto } from './dto/update-type-agendum.dto';

@Controller('type-agenda')
export class TypeAgendaController {
  constructor(private readonly typeAgendaService: TypeAgendaService) {}

  @Post()
  create(@Body() createTypeAgendumDto: CreateTypeAgendumDto) {
    return this.typeAgendaService.create(createTypeAgendumDto);
  }

  @Get()
  findAll() {
    return this.typeAgendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeAgendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeAgendumDto: UpdateTypeAgendumDto) {
    return this.typeAgendaService.update(+id, updateTypeAgendumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeAgendaService.remove(+id);
  }
}
