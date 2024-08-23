export class DetailAgendum {
  id?: number;
  uuid: string;
  title: string;
  typeAgendaId?: number;
  typeAgenda?: any;
  start: Date;
  finish: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export function selectedFieldDetailAgenda() {
  return {
    uuid: true,
    title: true,
    start: true,
    description: true,
    finish: true,
    typeAgenda: {
      select: {
        name: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  };
}
