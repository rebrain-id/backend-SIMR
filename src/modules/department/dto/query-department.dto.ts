import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryDepartmentDto {
  @ApiPropertyOptional({
    description: 'Get department by user',
    example: 'Babayo',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Filter by name',
    example: 'Sang Surya',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by page',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Filter by limit',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
