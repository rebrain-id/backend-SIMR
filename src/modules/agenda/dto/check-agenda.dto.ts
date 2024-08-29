import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckAgendaDto {
  @ApiProperty({ example: ['uuidDepartmentBoss'] })
  @IsNotEmpty()
  @IsArray()
  departmentsUuid: string[];

  @ApiProperty({ example: '2002-01-01 00:00:00' })
  @IsString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({ example: '2002-01-01 01:00:00' })
  @IsString()
  @IsNotEmpty()
  finish: string;
}
