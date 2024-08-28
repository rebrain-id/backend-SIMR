import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendaDto {
  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsArray()
  lecturerUuid: string[];

  @ApiProperty({ type: String })
  @IsString()
  detailAgendaUuid: string;
}
