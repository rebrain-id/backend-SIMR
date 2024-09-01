import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeAgendumDto {
  @ApiProperty({ example: 'Rapat Internal' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
