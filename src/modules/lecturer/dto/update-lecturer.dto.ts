import { PartialType } from '@nestjs/mapped-types';
import { CreateLecturerDto } from './create-lecturer.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLecturerDto extends PartialType(CreateLecturerDto) {
  @ApiProperty({ example: 'Sang Surya' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'sangsurya@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '08123456789' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2' })
  @IsNotEmpty()
  @IsString()
  departmentUuid: string;
}
