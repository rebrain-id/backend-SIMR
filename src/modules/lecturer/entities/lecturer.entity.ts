export class Lecturer {
  id?: number;
  uuid: string;
  name: string;
  email: string;
  phoneNumber: string;
  departmentId?: number;
  createdAt: Date;
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
