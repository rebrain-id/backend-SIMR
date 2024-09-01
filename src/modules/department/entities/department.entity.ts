import { ApiProperty } from '@nestjs/swagger';

export class Department {
  id?: number;

  @ApiProperty({ example: 'd1d8a267-365a-4556-8881-12aad8dbde63' })
  uuid: string;

  @ApiProperty({ example: 'Sastra Informatika' })
  name: string;

  @ApiProperty({ example: '2024-08-29T15:48:02.661Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-08-29T15:48:02.661Z' })
  updatedAt: Date;
}

export function selectedFieldDepartment() {
  return {
    uuid: true,
    name: true,
    createdAt: true,
    updatedAt: true,
  };
}
