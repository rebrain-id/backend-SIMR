import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetailAgendumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  finish: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  typeAgendaUuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  departmentsUuid: string[];
}
