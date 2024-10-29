import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username for user',
    example: 'Sang Surya',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password for user',
    example: 'thisismypassword',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Department for user',
    example: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
  })
  @IsNotEmpty()
  @IsString()
  departmentUuid: string;

  @IsOptional()
  @IsNumber()
  jabatanValue: number;
}
