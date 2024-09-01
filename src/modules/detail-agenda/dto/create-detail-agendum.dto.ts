import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetailAgendumDto {
  @ApiProperty({ example: 'Rapat Anggaran Rebrain' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Rapat ini berisi tentang RebrainStudio yang akan menjadi vendor Unmuh Jember',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: '2022-01-01 00:00:00' })
  @IsNotEmpty()
  @IsString()
  start: string;

  @ApiProperty({ example: '2022-01-01 01:00:00' })
  @IsNotEmpty()
  @IsString()
  finish: string;

  @ApiProperty({ example: 'uuidTypeAgendaBoss' })
  @IsNotEmpty()
  @IsString()
  typeAgendaUuid: string;

  @ApiProperty({ example: 'Ruang Rapat Dosen' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ example: 'informatika' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: ['uuidDepartment1', 'uuidDepartment2'] })
  @IsNotEmpty()
  @IsArray()
  departmentsUuid: string[];
}
