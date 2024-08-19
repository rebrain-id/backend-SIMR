import { Module } from '@nestjs/common';
import { TypeAgendaService } from './type-agenda.service';
import { TypeAgendaController } from './type-agenda.controller';

@Module({
  controllers: [TypeAgendaController],
  providers: [TypeAgendaService],
})
export class TypeAgendaModule {}
