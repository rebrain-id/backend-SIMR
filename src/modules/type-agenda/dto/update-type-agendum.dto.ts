import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeAgendumDto } from './create-type-agendum.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTypeAgendumDto extends PartialType(CreateTypeAgendumDto) {
  @ApiProperty({ example: 'Rapat Internal' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
