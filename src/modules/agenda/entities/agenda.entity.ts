import { ApiProperty } from '@nestjs/swagger';

export class Agenda {
  id?: number;
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  lecturer: any;

  @ApiProperty()
  detailAgenda: any;
}
