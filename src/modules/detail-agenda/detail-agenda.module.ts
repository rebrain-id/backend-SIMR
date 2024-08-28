import { Module } from '@nestjs/common';
import { DetailAgendaService } from './detail-agenda.service';
import { DetailAgendaController } from './detail-agenda.controller';
import { AgendaModule } from '../agenda/agenda.module';

@Module({
  imports: [AgendaModule],
  controllers: [DetailAgendaController],
  providers: [DetailAgendaService],
})
export class DetailAgendaModule {}
