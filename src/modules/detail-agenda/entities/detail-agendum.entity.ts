import { ApiProperty } from '@nestjs/swagger';
import { TypeAgenda } from '../../type-agenda/entities/type-agendum.entity';
import { Type } from '@nestjs/common';

export class DetailAgendums {
  @ApiProperty({ example: 'uuidlkasdhgahgoidhg' })
  uuid: string;

  @ApiProperty({})
  title: string;

  @ApiProperty({
    example:
      'Rapat ini berisi tentang RebrainStudio yang akan menjadi vendor Unmuh Jember',
  })
  description: string;

  @ApiProperty({ example: '2022-01-01 00:00:00' })
  start: Date;

  @ApiProperty({ example: '2022-01-01 01:00:00' })
  finish: Date;

  @ApiProperty({ type: TypeAgenda })
  typeAgenda: TypeAgenda;

  @ApiProperty({ example: 'Ruang Rapat Dosen' })
  location: string;

  @ApiProperty({ example: 'informatika' })
  author: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}

export class DetailAgendum {
  @ApiProperty({ example: 'uuidlkasdhgahgoidhg' })
  uuid: string;

  @ApiProperty({})
  title: string;

  @ApiProperty({
    example:
      'Rapat ini berisi tentang RebrainStudio yang akan menjadi vendor Unmuh Jember',
  })
  description: string;

  @ApiProperty({ example: '2022-01-01 00:00:00' })
  start: Date;

  @ApiProperty({ example: '2022-01-01 01:00:00' })
  finish: Date;

  @ApiProperty({ type: TypeAgenda })
  typeAgenda: TypeAgenda;

  @ApiProperty({ example: 'Ruang Rapat Dosen' })
  location: string;

  @ApiProperty({ example: 'informatika' })
  author: string;

  @ApiProperty()
  departments: string[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}

export function selectedFieldDetailAgenda() {
  return {
    uuid: true,
    title: true,
    start: true,
    description: true,
    finish: true,
    departmentsId: true,
    typeAgenda: {
      select: {
        uuid: true,
        name: true,
      },
    },
    agenda: {
      select: {
        lecturer: {
          select: {
            uuid: true,
            name: true,
            email: true,
            phoneNumber: true,
            departmentId: true,
          },
        },
      },
    },
    user: {
      select: {
        username: true,
      },
    },
    notulen: true,
    absent: true,
    location: true,
    createdAt: true,
    updatedAt: true,
  };
}
