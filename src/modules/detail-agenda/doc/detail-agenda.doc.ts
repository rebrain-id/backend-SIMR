import {
  DetailAgendum,
  DetailAgendums,
} from '../entities/detail-agendum.entity';

export function findAllDetailAgendaDoc() {
  return {
    status: 200,
    description: 'Success get all detail agenda',
    type: DetailAgendums,
    example: {
      statusCode: 200,
      message: 'Success get all detail agenda',
      data: [
        {
          uuid: '09de4ce7-9acc-4d57-a86d-7a81deb98e40',
          title: 'Rapat Paripurna testing brp ini suksesss harusnya',
          start: '2024-05-20T05:00:00.000Z',
          finish: '2024-06-20T06:30:00.000Z',
          typeAgenda: {
            uuid: '57de51a5-7dc5-4e0d-8242-3e00431097c0',
            name: 'rapat Eksternal coy',
          },
          location: 'CC Lt 4.2',
          author: 'informatika',
        },
        {
          uuid: '45e7b993-e9dd-43eb-bf48-c3cdd4af2881',
          title: 'Rapat Paripurna testing brp ini suksesss harusnya',
          start: '2024-05-20T05:00:00.000Z',
          finish: '2024-06-20T06:30:00.000Z',
          typeAgenda: {
            uuid: '57de51a5-7dc5-4e0d-8242-3e00431097c0',
            name: 'rapat Eksternal coy',
          },
          location: 'CC Lt 4.2',
          author: 'informatika',
        },
      ],
    },
  };
}

export function createDetailAgendaDoc() {
  return {
    status: 201,
    description: 'Success create detail agenda',
    example: {
      statusCode: 201,
      message: 'Success create detail agenda',
      data: {
        uuid: '73a3e3cc-ab51-41aa-b68a-a7a4045ce41e',
        title: 'Rapat Anggaran Rebrain',
        description:
          'Rapat ini berisi tentang RebrainStudio yang akan menjadi vendor Unmuh Jember',
        location: 'CC Lt 4.2',
        start: '2024-05-20T05:00:00.000Z',
        finish: '2024-06-20T06:30:00.000Z',
        typeAgenda: {
          uuid: '57de51a5-7dc5-4e0d-8242-3e00431097c0',
          name: 'rapat Eksternal coy',
        },
        departments: [
          {
            uuid: 'ae4daf7c-39f9-4c7c-89d2-d6e2727bdbee',
            name: 'S1 Informatika',
          },
        ],
        createdAt: '2024-08-29T16:16:39.218Z',
        updatedAt: '2024-08-29T16:16:39.218Z',
      },
    },
  };
}

export function findOneDetailAgendaDoc() {
  return {
    status: 200,
    description: 'Success get detail agenda',
    type: DetailAgendum,
    example: {
      statusCode: 200,
      message: 'Success get detail agenda',
      data: {
        uuid: '45e7b993-e9dd-43eb-bf48-c3cdd4af2881',
        title: 'Rapat Paripurna testing brp ini suksesss harusnya',
        description: 'coba 123',
        start: '2024-05-20T05:00:00.000Z',
        finish: '2024-06-20T06:30:00.000Z',
        typeAgenda: {
          uuid: '57de51a5-7dc5-4e0d-8242-3e00431097c0',
          name: 'rapat Eksternal coy',
        },
        departments: [
          {
            uuid: 'ae4daf7c-39f9-4c7c-89d2-d6e2727bdbee',
            name: 'S1 Informatika',
          },
        ],
        location: 'CC Lt 4.2',
        createdAt: '2024-08-29T07:26:20.063Z',
        updatedAt: '2024-08-29T07:26:20.077Z',
      },
    },
  };
}
