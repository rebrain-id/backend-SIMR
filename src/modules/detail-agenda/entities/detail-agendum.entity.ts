import { ApiProperty } from '@nestjs/swagger';

export class DetailAgendum {
  id?: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  typeAgendaId?: number;

  @ApiProperty()
  typeAgenda?: any;

  user?: any;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  finish: Date;

  @ApiProperty()
  description: string;

  location: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
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
    location: true,
    createdAt: true,
    updatedAt: true,
  };
}
