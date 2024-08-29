import { ApiProperty } from '@nestjs/swagger';

export class Lecturer {
  id?: number;

  @ApiProperty({ example: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2' })
  uuid: string;

  @ApiProperty({ example: 'Sang Surya' })
  name: string;

  @ApiProperty({ example: 'sangsurya@gmail.com' })
  email: string;

  @ApiProperty({ example: '08123456789' })
  phoneNumber: string;

  @ApiProperty({ example: '1' })
  departmentId?: number;

  @ApiProperty({ example: '2024-08-29T16:38:09.714Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-08-29T16:41:41.648Z' })
  updatedAt: Date;
}

export function selectedFieldLecturer() {
  return {
    uuid: true,
    name: true,
    email: true,
    phoneNumber: true,
    department: {
      select: {
        uuid: true,
        name: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  };
}
