import { Role } from '@prisma/client';

export class User {
  id?: number;
  username: string;
  password: string;
  departmentId?: number;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export function selectedFieldUser() {
  return {
    username: true,
    password: true,
    department: {
      select: {
        uuid: true,
        name: true,
      },
    },
    role: true,
    jabatanValue: true,
    createdAt: true,
    updatedAt: true,
  };
}
