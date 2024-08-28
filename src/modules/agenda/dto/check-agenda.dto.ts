import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckAgendaDto {
  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsArray()
  departmentsUuid: string[];

  @ApiProperty({ type: [String] })
  @IsString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({ type: [String] })
  @IsString()
  @IsNotEmpty()
  finish: string;
}
