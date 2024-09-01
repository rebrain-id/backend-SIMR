import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Sastra Informatika' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
