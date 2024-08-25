import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendaDto {
  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsArray()
  lecturerUuid: string[];

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsString()
  detailAgendaUuid: string;
}
