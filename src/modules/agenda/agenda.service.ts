import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { selectedFieldDetailAgenda } from '../detail-agenda/entities/detail-agendum.entity';

@Injectable()
export class AgendaService {
  constructor(private readonly prisma: PrismaService) {}

  async checkExistAgenda(createAgendaDto: CreateAgendaDto) {
    const { lecturerUuid, detailAgendaUuid } = createAgendaDto;

    const existLecturer = await this.prisma.lecturer.findUnique({
      where: { uuid: lecturerUuid[0] },
    });
    if (!existLecturer) throw new HttpException('Lecturer not found', 404);

    const existDetailAgenda = await this.prisma.detailAgenda.findUnique({
      where: { uuid: detailAgendaUuid },
    });
    if (!existDetailAgenda)
      throw new HttpException('Detail Agenda not found', 404);

    const existingAgenda = await this.prisma.agenda.findMany({
      where: {
        lecturerId: existLecturer.id,
        OR: [
          {
            detailAgenda: {
              start: { lt: existDetailAgenda.finish },
              finish: { gt: existDetailAgenda.start },
            },
          },
          {
            detailAgenda: {
              start: { gt: existDetailAgenda.start },
              finish: { lt: existDetailAgenda.finish },
            },
          },
        ],
      },
    });

    const existSchedule = [];
    const promiseAgenda = existingAgenda.map(async (agenda) => {
      const detailAgenda = await this.prisma.detailAgenda.findUnique({
        where: { id: agenda.detailAgendaId },
      });
      existSchedule.push({
        title: detailAgenda.title,
        start: detailAgenda.start,
        finish: detailAgenda.finish,
      });
    });
    await Promise.all(promiseAgenda);

    if (existingAgenda.length > 0)
      return {
        conflict: true,
        message: `lecturer ${existLecturer.name} has an agenda`,
        data: existSchedule,
      };

    return { conflict: false, message: 'lecturer available' };
  }

  async create(createAgendaDto: CreateAgendaDto) {
    const { lecturerUuid, detailAgendaUuid } = createAgendaDto;

    const existDetailAgenda = await this.prisma.detailAgenda.findUnique({
      where: { uuid: detailAgendaUuid },
    });
    if (!existDetailAgenda)
      throw new HttpException('Detail Agenda not found', 404);

    const lecturer = await this.prisma.lecturer.findMany({
      where: { uuid: { in: lecturerUuid } },
      select: { id: true },
    });
    if (lecturer.length !== lecturerUuid.length)
      throw new HttpException('have problem with any lecturer not found', 404);

    const dataAgenda = [];
    for (let i = 0; i < lecturer.length; i++) {
      dataAgenda.push({
        lecturerId: lecturer[i].id,
        detailAgendaId: existDetailAgenda.id,
      });
    }

    try {
      await this.prisma.agenda.createMany({
        data: dataAgenda,
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'failed create Agenda',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const detailAgenda = await this.prisma.detailAgenda.findUnique({
      where: { uuid: detailAgendaUuid },
      select: selectedFieldDetailAgenda(),
    });

    return detailAgenda;
  }

  async findAll() {
    const result = await this.prisma.agenda.findMany();
    if (result.length === 0) throw new HttpException('Agenda not found', 404);

    return result;
  }
}
