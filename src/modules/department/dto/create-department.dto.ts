import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'Name for department',
    example: 'Sastra Informatika',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
