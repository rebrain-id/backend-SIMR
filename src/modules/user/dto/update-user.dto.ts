import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'User old password',
    example: 'thisismypassword',
  })
  @IsOptional()
  @IsString()
  oldPassword: string;

  @ApiPropertyOptional({
    description: 'User new password',
    example: 'newpassword',
  })
  @IsOptional()
  @IsString()
  newPassword: string;

  @ApiPropertyOptional({
    description: 'Update user role',
    example: 'FAKULTAS',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
