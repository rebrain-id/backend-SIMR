import { Module } from '@nestjs/common';
import { TypeAgendaService } from './type-agenda.service';
import { TypeAgendaController } from './type-agenda.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [TypeAgendaController],
  providers: [TypeAgendaService],
})
export class TypeAgendaModule {}
