import { HttpStatus } from '@nestjs/common';
import { CheckAgendaDto } from '../dto/check-agenda.dto';

export function checkExistAgenda() {
  return {
    status: HttpStatus.OK,
    type: CheckAgendaDto,
    example: {
      statusCode: 200,
      message: 'Success check exist agenda',
      data: [
        {
          status: 'conflict schedule',
          lecturerUuid: '318dafdf-fdca-4a76-8042-e781e02d9b3f',
          name: 'Tiffany Zieme',
          detailAgendaUuid: '09de4ce7-9acc-4d57-a86d-7a81deb98e40',
          titleAgenda: 'Rapat Paripurna testing brp ini suksesss harusnya',
          start: '2024-05-20T05:00:00.000Z',
          finish: '2024-06-20T06:30:00.000Z',
        },
        {
          status: 'conflict schedule',
          lecturerUuid: '3a93ca1d-8ced-4096-b17e-297601490928',
          name: 'Daniel Volkman',
          detailAgendaUuid: '09de4ce7-9acc-4d57-a86d-7a81deb98e40',
          titleAgenda: 'Rapat Paripurna testing brp ini suksesss harusnya',
          start: '2024-05-20T05:00:00.000Z',
          finish: '2024-06-20T06:30:00.000Z',
        },
      ],
    },
  };
}
