import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLecturerDto {
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
