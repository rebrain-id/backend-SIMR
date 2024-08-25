import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDto } from './create-agenda.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsString()
  lecturerUuid: string[];

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsString()
  detailAgendaUuid: string;
}
