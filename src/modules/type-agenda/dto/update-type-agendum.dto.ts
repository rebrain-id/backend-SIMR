import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeAgendumDto } from './create-type-agendum.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTypeAgendumDto extends PartialType(CreateTypeAgendumDto) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
