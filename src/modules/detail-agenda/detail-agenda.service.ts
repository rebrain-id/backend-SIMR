import { HttpException, Injectable } from '@nestjs/common';
import { CreateDetailAgendumDto } from './dto/create-detail-agendum.dto';
import { UpdateDetailAgendumDto } from './dto/update-detail-agendum.dto';
import { PrismaService } from '../../prisma/prisma.service';
import {
  DetailAgendum,
  selectedFieldDetailAgenda,
} from './entities/detail-agendum.entity';
import { TypeAgenda } from '../type-agenda/entities/type-agendum.entity';
import { parse } from 'date-fns';
import { AgendaService } from '../agenda/agenda.service';
import { response } from 'express';

@Injectable()
export class DetailAgendaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly agendaService: AgendaService,
  ) {}

  async create(createDetailAgendumDto: CreateDetailAgendumDto): Promise<any> {
    const {
      title,
      description,
      start,
      finish,
      typeAgendaUuid,
      username,
      departmentsUuid,
      location,
    } = createDetailAgendumDto;

    const startDate = this.parseDate(start, 'start');
    const endDate = this.parseDate(finish, 'finish');
    if (startDate > endDate)
      throw new HttpException('finish must be greather from start', 400);

    const typeAgenda: TypeAgenda = await this.prisma.typeAgenda.findUnique({
      where: {
        uuid: typeAgendaUuid,
      },
    });
    if (!typeAgenda) throw new HttpException('Type Agenda not found', 404);

    const parseUserId = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
      },
    });

    if (!parseUserId) throw new HttpException('Username not found', 404);

    try {
      const getDepartmentsId = await this.prisma.department.findMany({
        where: {
          uuid: {
            in: departmentsUuid,
          },
        },
        select: {
          id: true,
          uuid: true,
          name: true,
        },
      });

      const departmentsId = getDepartmentsId.map((department) => department.id);

      const lecturerByDepartment = await this.prisma.lecturer.findMany({
        where: {
          departmentId: {
            in: departmentsId,
          },
        },
      });

      const lecturerUuid = lecturerByDepartment.map(
        (lecturer) => lecturer.uuid,
      );

      if (lecturerUuid.length === 0)
        throw new HttpException('Not found the lecturers', 404);

      const detailAgenda: DetailAgendum = await this.prisma.detailAgenda.create(
        {
          data: {
            title,
            description,
            start: startDate,
            finish: endDate,
            userId: parseUserId.id,
            typeAgendaId: typeAgenda.id,
            location,
          },
        },
      );

      await this.agendaService.create({
        lecturerUuid,
        detailAgendaUuid: detailAgenda.uuid,
      });

      await this.prisma.detailAgenda.update({
        where: { uuid: detailAgenda.uuid },
        data: {
          departmentsId: departmentsId,
        },
        select: {
          typeAgenda: {
            select: {
              uuid: true,
              name: true,
            },
          },
        },
      });

      const extractDepartmentId = await this.prisma.department.findMany({
        where: {
          id: {
            in: departmentsId,
          },
        },
        select: {
          uuid: true,
          name: true,
        },
      });

      const response = {
        uuid: detailAgenda.uuid,
        title: detailAgenda.title,
        description: detailAgenda.description,
        location: detailAgenda.location,
        start: detailAgenda.start,
        finish: detailAgenda.finish,
        departments: extractDepartmentId,
        createdAt: detailAgenda.createdAt,
        updatedAt: detailAgenda.updatedAt,
      };

      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }
  async findAllByUserDepartment(
    username: string,
  ): Promise<DetailAgendum[] | any> {
    const findUserByUsername = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        departmentId: true,
      },
    });
    if (!findUserByUsername) throw new HttpException('User not found', 404);

    const detailAgendas = await this.prisma.detailAgenda.findMany({
      select: selectedFieldDetailAgenda(),
    });

    if (detailAgendas.length === 0)
      throw new HttpException('Detail Agenda not found', 404);

    const filteredDetailAgendas = detailAgendas.filter(
      (agenda) =>
        Array.isArray(agenda.departmentsId) &&
        agenda.departmentsId.includes(findUserByUsername.departmentId),
    );
    const response = [];
    filteredDetailAgendas.map((agenda) => {
      response.push({
        uuid: agenda.uuid,
        title: agenda.title,
        start: agenda.start,
        finish: agenda.finish,
        typeAgenda: {
          uuid: agenda.typeAgenda.uuid,
          name: agenda.typeAgenda.name,
        },
        location: agenda.location,
        author: agenda.user.username,
      });
    });
    return response;
  }

  async findOne(uuid: string): Promise<any> {
    const detailAgenda = await this.prisma.detailAgenda.findUnique({
      where: {
        uuid,
      },
      select: selectedFieldDetailAgenda(),
    });

    if (!detailAgenda) throw new HttpException('Detail Agenda not found', 404);

    const departmentId = [];
    detailAgenda.agenda.map((agenda) => {
      departmentId.push(agenda.lecturer.departmentId);
    });

    const department = await this.prisma.department.findMany({
      where: {
        id: {
          in: departmentId,
        },
      },
      select: {
        uuid: true,
        name: true,
      },
    });

    const response = {
      uuid: detailAgenda.uuid,
      title: detailAgenda.title,
      description: detailAgenda.description,
      start: detailAgenda.start,
      finish: detailAgenda.finish,
      typeAgenda: {
        uuid: detailAgenda.typeAgenda.uuid,
        name: detailAgenda.typeAgenda.name,
      },
      departments: department,
      location: detailAgenda.location,
      createdAt: detailAgenda.createdAt,
      updatedAt: detailAgenda.updatedAt,
    };
    return response;
  }

  async update(uuid: string, updateDetailAgendumDto: UpdateDetailAgendumDto) {
    const { title, description, start, finish, typeAgendaUuid } =
      updateDetailAgendumDto;

    const exist = await this.prisma.detailAgenda.findUnique({
      where: {
        uuid,
      },
      select: {
        typeAgenda: {
          select: {
            uuid: true,
          },
        },
      },
    });

    if (!exist) throw new HttpException('Detail Agenda not found', 404);

    const typeAgenda = await this.prisma.typeAgenda.findUnique({
      where: {
        uuid: typeAgendaUuid ?? exist.typeAgenda.uuid,
      },
    });
    if (!typeAgenda) throw new HttpException('Type Agenda not found', 404);

    const startDate = this.parseDate(start, 'start');
    const endDate = this.parseDate(finish, 'finish');

    try {
      const result = await this.prisma.detailAgenda.update({
        where: {
          uuid,
        },
        data: {
          title,
          description,
          start: startDate,
          finish: endDate,
          typeAgendaId: typeAgenda.id,
        },
        select: selectedFieldDetailAgenda(),
      });

      if (!result) throw new HttpException('internal server error', 500);

      return result;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(uuid: string) {
    const exists = await this.prisma.detailAgenda.findUnique({
      where: { uuid },
    });
    if (!exists) throw new HttpException('Detail Agenda not found', 404);

    try {
      await this.prisma.detailAgenda.delete({ where: { uuid } });
      return 'success delete detail agenda with uuid: ' + uuid;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
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
