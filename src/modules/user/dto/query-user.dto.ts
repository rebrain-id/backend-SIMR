import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class QueryUserDto {
  @ApiPropertyOptional({
    description: 'Filter by username',
    example: 'Sang Surya',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Filter by department',
    example: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Filter by role',
    example: 'PRODI',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({
    description: 'Filter by page',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Filter by limit',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}
