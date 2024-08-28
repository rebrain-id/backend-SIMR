import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { selectedFieldDetailAgenda } from '../detail-agenda/entities/detail-agendum.entity';
import { parse } from 'date-fns';
import { CheckAgendaDto } from './dto/check-agenda.dto';

@Injectable()
export class AgendaService {
  constructor(private readonly prisma: PrismaService) {}

  async checkExistAgenda(chekAgendaDto: CheckAgendaDto) {
    const { departmentsUuid, start, finish } = chekAgendaDto;

    const parseStart = parse(start, 'yyyy-MM-dd HH:mm:ss', new Date());
    const parseFinish = parse(finish, 'yyyy-MM-dd HH:mm:ss', new Date());

    const getDepartmentId = await this.prisma.department.findMany({
      where: { uuid: { in: departmentsUuid } },
      select: { id: true },
    });
    if (!getDepartmentId) throw new HttpException('Department not found', 404);
    const departmentsId = getDepartmentId.map((department) => department.id);

    const getLecturerByDepartments = await this.prisma.lecturer.findMany({
      where: { departmentId: { in: departmentsId } },
    });

    const lecturerUuid = getLecturerByDepartments.map(
      (lecturer) => lecturer.uuid,
    );

    if (!getLecturerByDepartments)
      throw new HttpException(
        'have problem with any departments not found',
        404,
      );

    if (!parseStart || !parseFinish)
      throw new HttpException(
        'Invalid format for start and finish, use yyyy-MM-dd HH:mm:ss',
        400,
      );
    if (parseFinish < parseStart)
      throw new HttpException('finish must be greather from start', 400);

    // check exist Lecturer
    const existLecturer = await this.prisma.lecturer.findMany({
      where: { uuid: { in: lecturerUuid } },
    });
    if (!existLecturer) throw new HttpException('Lecturer not found', 404);

    const lecturerId = [];
    const lecturerName = [];
    existLecturer.map((lecturer) => {
      lecturerId.push(lecturer.id);
      lecturerName.push(lecturer.name);
    });

    const existingAgenda = await this.prisma.agenda.findMany({
      where: {
        lecturerId: { in: lecturerId },
        OR: [
          {
            detailAgenda: {
              start: { lt: parseFinish },
              finish: { gt: parseStart },
            },
          },
          {
            detailAgenda: {
              start: { gt: parseStart },
              finish: { lt: parseFinish },
            },
          },
        ],
      },
      include: {
        lecturer: true,
        detailAgenda: true,
      },
    });
    if (existingAgenda.length === 0)
      return { conflict: false, message: 'lecturer available' };

    const response = [];
    existingAgenda.map((agenda) => {
      response.push({
        status: 'conflict schedule',
        lecturerUuid: agenda.lecturer.uuid,
        name: agenda.lecturer.name,
        detailAgendaUuid: agenda.detailAgenda.uuid,
        titleAgenda: agenda.detailAgenda.title,
        start: agenda.detailAgenda.start,
        finish: agenda.detailAgenda.finish,
      });
    });

    if (response.length > 0) return response;

    return { conflict: false, lecturer: 'lecturer available' };
  }

  async create(createAgendaDto: CreateAgendaDto | any) {
    const { lecturerUuid, detailAgendaUuid } = createAgendaDto;
    console.log(lecturerUuid);
    console.log(detailAgendaUuid);

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

  //Helper
  private parseDate(dateString: string, fieldName: string): Date {
    const date = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
    if (!date)
      throw new HttpException(
        `Invalid format for ${fieldName}, use yyyy-MM-dd HH:mm:ss`,
        400,
      );
    return date;
  }
}
