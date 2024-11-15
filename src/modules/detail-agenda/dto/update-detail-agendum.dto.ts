import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailAgendumDto } from './create-detail-agendum.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDetailAgendumDto extends PartialType(
  CreateDetailAgendumDto,
) {}
