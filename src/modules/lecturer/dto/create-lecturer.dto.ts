import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLecturerDto {
  @ApiProperty({ description: 'Lecturer name', example: 'Sang Surya' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Lecturer email',
    example: 'sangsurya@gmail.com',
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional({
    description: 'Lecturer phone number',
    example: '08123456789',
  })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2' })
  @IsNotEmpty()
  @IsString()
  departmentUuid: string;
}
