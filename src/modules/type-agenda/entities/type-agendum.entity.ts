export class TypeAgenda {
  id?: number;
  uuid: string;
  name: string;
  createdAt: Date;
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
