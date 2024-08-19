import { Module } from '@nestjs/common';
import { DetailAgendaService } from './detail-agenda.service';
import { DetailAgendaController } from './detail-agenda.controller';

@Module({
  controllers: [DetailAgendaController],
  providers: [DetailAgendaService],
})
export class DetailAgendaModule {}
