import { Module } from '@nestjs/common';
import { TypeAgendaModule } from './modules/type-agenda/type-agenda.module';
import { PrismaModule } from './prisma/prisma.module';
import { DetailAgendaModule } from './modules/detail-agenda/detail-agenda.module';
import { AgendaModule } from './modules/agenda/agenda.module';
import { LecturerModule } from './modules/lecturer/lecturer.module';
import { DepartmentModule } from './modules/department/department.module';
import { UserModule } from './modules/user/user.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeAgendaModule,
    PrismaModule,
    DetailAgendaModule,
    AgendaModule,
    LecturerModule,
    DepartmentModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
