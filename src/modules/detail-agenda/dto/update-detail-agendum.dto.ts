import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailAgendumDto } from './create-detail-agendum.dto';
import { IsNotEmpty, IsString } from 'class-validator';

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
  typeAgendaUuid: string;
}
