import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailAgendaService } from './detail-agenda.service';
import { CreateDetailAgendumDto } from './dto/create-detail-agendum.dto';
import { UpdateDetailAgendumDto } from './dto/update-detail-agendum.dto';

@Controller('detail-agenda')
export class DetailAgendaController {
  constructor(private readonly detailAgendaService: DetailAgendaService) {}

  @Post()
  create(@Body() createDetailAgendumDto: CreateDetailAgendumDto) {
    return this.detailAgendaService.create(createDetailAgendumDto);
  }

  @Get()
  findAll() {
    return this.detailAgendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailAgendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailAgendumDto: UpdateDetailAgendumDto) {
    return this.detailAgendaService.update(+id, updateDetailAgendumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailAgendaService.remove(+id);
  }
}
