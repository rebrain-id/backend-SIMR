import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  departmentUuid: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;
}
