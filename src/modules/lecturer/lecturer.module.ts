import { Module } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { LecturerController } from './lecturer.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [LecturerController],
  providers: [LecturerService],
})
export class LecturerModule {}
