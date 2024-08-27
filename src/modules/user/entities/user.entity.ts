export class User {
  id?: number;
  username: string;
  password: string;
  departmentId?: number;
  isAdmin: boolean;
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
    isAdmin: true,
    createdAt: true,
    updatedAt: true,
  };
}
