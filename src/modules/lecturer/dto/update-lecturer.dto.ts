import { PartialType } from '@nestjs/mapped-types';
import { CreateLecturerDto } from './create-lecturer.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLecturerDto extends PartialType(CreateLecturerDto) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  departmentUuid: string;
}
