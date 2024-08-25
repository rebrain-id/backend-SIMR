import { ApiProperty } from '@nestjs/swagger';

export class TypeAgenda {
  id?: number;
  @ApiProperty({ example: 'gjsdlfjdsflksj' })
  uuid: string;
  @ApiProperty({ example: 'Rapat prodi' })
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export function selectedFieldTypeAgenda() {
  return {
    uuid: true,
    name: true,
    createdAt: true,
    updatedAt: true,
  };
}
