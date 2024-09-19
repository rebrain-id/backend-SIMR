import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailAgendumDto } from './create-detail-agendum.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDetailAgendumDto extends PartialType(
  CreateDetailAgendumDto,
) {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  start: string;

  @IsNotEmpty()
  @IsString()
  finish: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  typeAgendaUuid: string;

  @IsNotEmpty()
  @IsNumber()
  username: string;

  isDone: boolean;
}
