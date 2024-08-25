import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeAgendumDto {
  @ApiProperty({ example: 'rapat prodi' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
