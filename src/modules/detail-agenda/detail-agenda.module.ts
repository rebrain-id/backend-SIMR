import { Module } from '@nestjs/common';
import { DetailAgendaService } from './detail-agenda.service';
import { DetailAgendaController } from './detail-agenda.controller';
import { AgendaModule } from '../agenda/agenda.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AgendaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [DetailAgendaController],
  providers: [DetailAgendaService],
})
export class DetailAgendaModule {}
