export class Department {
  id?: number;
  uuid: string;
  name: string;
  createdAt: Date;
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
