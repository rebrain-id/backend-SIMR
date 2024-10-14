import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryLecturerDto {
  @ApiPropertyOptional({
    description: 'Filter by username',
    example: 'babayo',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Filter by lecturer name',
    example: 'Sang Surya',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by lecturer department',
    example: 'Sastra Informatika',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Filter by page',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Filter by limit',
    example: '10',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}
