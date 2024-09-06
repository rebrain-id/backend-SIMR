import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  oldPassword: string;

  @IsOptional()
  @IsString()
  newPassword: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
