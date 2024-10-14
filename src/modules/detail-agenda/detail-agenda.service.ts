import { HttpException, Injectable } from '@nestjs/common';
import { CreateDetailAgendumDto } from './dto/create-detail-agendum.dto';
import { PrismaService } from '../../prisma/prisma.service';
import {
  DetailAgendums,
  selectedFieldDetailAgenda,
} from './entities/detail-agendum.entity';
import { TypeAgenda } from '../type-agenda/entities/type-agendum.entity';
import { parse } from 'date-fns';
import { AgendaService } from '../agenda/agenda.service';

@Injectable()
export class DetailAgendaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly agendaService: AgendaService,
  ) {}

  async createV2(createDetailAgendumDto: CreateDetailAgendumDto): Promise<any> {
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

      const detailAgenda = await this.prisma.detailAgenda.create({
        data: {
          title,
          description,
          start: startDate,
          finish: endDate,
          userId: parseUserId.id,
          typeAgendaId: typeAgenda.id,
          location,
        },
        include: {
          typeAgenda: true,
        },
      });

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
        typeAgenda: {
          uuid: detailAgenda.typeAgenda.uuid,
          name: detailAgenda.typeAgenda.name,
        },
        departments: extractDepartmentId,
        createdAt: detailAgenda.createdAt,
        updatedAt: detailAgenda.updatedAt,
      };

      return response;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async createDetailAgenda(createDetailAgendumDto: any): Promise<any> {
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
      const createDetailAgenda = await this.prisma.detailAgenda.create({
        data: {
          title,
          description,
          start: startDate,
          finish: endDate,
          userId: parseUserId.id,
          typeAgendaId: typeAgenda.id,
          location,
        },
      });

      await this.agendaService.create({
        detailAgendaUuid: createDetailAgenda.uuid,
        departmentsUuid,
      });

      return createDetailAgenda;
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  async findAllDetailAgenda() {
    const detailAgenda = await this.prisma.detailAgenda.findMany({});
    return detailAgenda;
  }

  async findAllByUserDepartment(
    username: string,
  ): Promise<DetailAgendums[] | any> {
    if (!username) throw new HttpException('Username not found', 404);

    const findUserByUsername = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        departmentId: true,
      },
    });
    if (!findUserByUsername) throw new HttpException('User not found', 404);

    const departmentsAgenda = await this.prisma.departmentAgenda.findMany({
      where: {
        departmentId: findUserByUsername.departmentId,
      },
      select: {
        detailAgenda: {
          select: {
            uuid: true,
            title: true,
            start: true,
            finish: true,
            isDone: true,
            location: true,
            typeAgenda: {
              select: {
                uuid: true,
                name: true,
              },
            },
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    if (departmentsAgenda.length === 0)
      throw new HttpException('Detail Agenda not found', 404);

    const dataAgenda = [];
    departmentsAgenda.forEach((agenda) => {
      dataAgenda.push({
        uuid: agenda.detailAgenda.uuid,
        title: agenda.detailAgenda.title,
        start: agenda.detailAgenda.start,
        finish: agenda.detailAgenda.finish,
        isDone: agenda.detailAgenda.isDone,
        location: agenda.detailAgenda.location,
        typeAgenda: {
          uuid: agenda.detailAgenda.typeAgenda.uuid,
        },
        author: {
          username: agenda.detailAgenda.user.username,
        },
      });
    });

    return dataAgenda;
  }

  async findAllHistory(
    username: string,
    start: string,
    finish: string,
    skip: string,
    take: string,
  ): Promise<DetailAgendums[] | any> {
    if (!username) throw new HttpException('Username not found', 404);
    if (!start || !finish)
      throw new HttpException('start and finish not null', 404);

    const startDate = this.parseDate(start, 'start');
    const endDate = this.parseDate(finish, 'finish');
    if (startDate > endDate)
      throw new HttpException('finish must be greather from start', 400);

    const findUserByUsername = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        departmentId: true,
      },
    });
    if (!findUserByUsername) throw new HttpException('User not found', 404);

    const departmentsAgenda = await this.prisma.departmentAgenda.findMany({
      where: {
        departmentId: findUserByUsername.departmentId,
        detailAgenda: {
          start: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      skip: Number(skip) ?? undefined,
      take: Number(take) ?? undefined,
      select: {
        detailAgenda: {
          select: {
            uuid: true,
            title: true,
            start: true,
            finish: true,
            isDone: true,
            location: true,
            typeAgenda: {
              select: {
                uuid: true,
                name: true,
              },
            },
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    const dataAgenda = [];
    departmentsAgenda.forEach((agenda) => {
      dataAgenda.push({
        uuid: agenda.detailAgenda.uuid,
        title: agenda.detailAgenda.title,
        start: agenda.detailAgenda.start,
        finish: agenda.detailAgenda.finish,
        isDone: agenda.detailAgenda.isDone,
        location: agenda.detailAgenda.location,
        typeAgenda: {
          uuid: agenda.detailAgenda.typeAgenda.uuid,
        },
        author: {
          username: agenda.detailAgenda.user.username,
        },
      });
    });

    return dataAgenda;
  }

  async findAllDetailAgendaByFilter(query: {
    username: string;
    keyword?: string;
    start?: string;
    finish?: string;
    typeAgenda?: any;
    page?: string;
    limit?: string;
  }): Promise<DetailAgendums[] | any> {
    // eslint-disable-next-line prefer-const
    let { username, start, finish, typeAgenda, keyword } = query;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    if (!username) throw new HttpException('Username not found', 404);

    if (typeAgenda) {
      typeAgenda = await this.prisma.typeAgenda.findUnique({
        where: {
          uuid: typeAgenda,
        },
        select: {
          id: true,
        },
      });
    }

    const getDefaultStartTime = () => {
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0);
      return date;
    };

    const getDefaultEndTime = () => {
      const date = new Date();
      date.setUTCHours(23, 59, 59, 999);
      return date;
    };

    const startDate =
      this.parseDate(start, 'start') ?? getDefaultStartTime().toISOString();
    const endDate =
      this.parseDate(finish, 'finish') ?? getDefaultEndTime().toISOString();

    if (startDate > endDate)
      throw new HttpException('finish must be greather from start', 400);

    const findUserByUsername = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        role: true,
        departmentId: true,
      },
    });
    if (!findUserByUsername) throw new HttpException('User not found', 404);

    if (findUserByUsername.role === 'FAKULTAS') {
      const result = await this.prisma.departmentAgenda.findMany({
        where: {
          detailAgenda: {
            start: {
              gte: startDate,
              lte: endDate,
            },
          },
          detailAgendaId: typeAgenda ? typeAgenda.id : undefined,
        },
        orderBy: {
          detailAgenda: {
            id: 'desc',
          },
        },
        skip: offset,
        take: limit,
        select: {
          detailAgenda: {
            select: {
              uuid: true,
              title: true,
              start: true,
              finish: true,
              isDone: true,
              location: true,
              typeAgenda: {
                select: {
                  uuid: true,
                  name: true,
                },
              },
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      if (result.length === 0) {
        throw new HttpException('tidak ada agenda rapat', 404);
      }

      const detailAgendas = [];

      result.forEach((agenda) => {
        detailAgendas.push({
          uuid: agenda.detailAgenda.uuid,
          title: agenda.detailAgenda.title,
          start: agenda.detailAgenda.start,
          finish: agenda.detailAgenda.finish,
          isDone: agenda.detailAgenda.isDone,
          location: agenda.detailAgenda.location,
          typeAgenda: {
            uuid: agenda.detailAgenda.typeAgenda.uuid,
          },
          author: {
            username: agenda.detailAgenda.user.username,
          },
        });
      });

      console.log(result);
      const countDetailAgenda = await this.prisma.detailAgenda.count();
      return { detailAgendas, total: countDetailAgenda };
    }

    const departmentsAgenda = await this.prisma.departmentAgenda.findMany({
      where: {
        departmentId: findUserByUsername.departmentId,
        detailAgenda: {
          title: {
            contains: keyword,
          },
          start: {
            gte: startDate,
            lte: endDate,
          },
        },
        detailAgendaId: typeAgenda ? typeAgenda.id : undefined,
      },
      orderBy: {
        detailAgenda: {
          id: 'desc',
        },
      },
      skip: offset,
      take: limit,
      select: {
        detailAgenda: {
          select: {
            uuid: true,
            title: true,
            start: true,
            finish: true,
            isDone: true,
            location: true,
            typeAgenda: {
              select: {
                uuid: true,
                name: true,
              },
            },
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.departmentAgenda.count({
      where: {
        departmentId: findUserByUsername.departmentId,
      },
    });

    const dataAgenda = [];
    departmentsAgenda.forEach((agenda) => {
      dataAgenda.push({
        uuid: agenda.detailAgenda.uuid,
        title: agenda.detailAgenda.title,
        start: agenda.detailAgenda.start,
        finish: agenda.detailAgenda.finish,
        isDone: agenda.detailAgenda.isDone,
        location: agenda.detailAgenda.location,
        typeAgenda: {
          uuid: agenda.detailAgenda.typeAgenda.uuid,
        },
        author: {
          username: agenda.detailAgenda.user.username,
        },
      });
    });

    return { dataAgenda, total };
  }

  async findAllByUserDepartmentV2(
    username: string,
  ): Promise<DetailAgendums[] | any> {
    if (!username) throw new HttpException('Username not found', 404);

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

    if (filteredDetailAgendas.length === 0)
      throw new HttpException('Detail Agenda not found', 404);

    const response = [];
    filteredDetailAgendas.map((agenda) => {
      response.push({
        uuid: agenda.uuid,
        title: agenda.title,
        start: agenda.start,
        finish: agenda.finish,
        isDone: agenda.isDone,
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

  async findOneDetailAgenda(uuid: string): Promise<any> {
    const detailAgenda = await this.prisma.detailAgenda.findUnique({
      where: {
        uuid,
      },
      include: {
        typeAgenda: true,
        user: true,
      },
    });

    if (!detailAgenda) throw new HttpException('Detail Agenda not found', 404);

    const departments = await this.prisma.departmentAgenda.findMany({
      where: {
        detailAgendaId: detailAgenda.id,
      },
      include: {
        department: true,
      },
    });

    const dataDeparments = [];
    departments.forEach((department) => {
      dataDeparments.push({
        uuid: department.department.uuid,
        name: department.department.name,
      });
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
      departments: dataDeparments,
      author: detailAgenda.user.username,
      isDone: detailAgenda.isDone,
      notulen: detailAgenda.notulen,
      absent: detailAgenda.absent,
      location: detailAgenda.location,
      createdAt: detailAgenda.createdAt,
      updatedAt: detailAgenda.updatedAt,
    };
    return response;
  }

  async updateDetailAgenda(uuid: string, updateDetailAgendumDto: any, files) {
    const {
      title,
      description,
      start,
      finish,
      isDone,
      departmentsUuid,
      typeAgendaUuid,
    } = updateDetailAgendumDto;

    const getTypeAgenda = await this.prisma.typeAgenda.findUnique({
      where: {
        uuid: typeAgendaUuid,
      },
    });
    if (!getTypeAgenda) throw new HttpException('Type Agenda not found', 404);

    const exist = await this.prisma.detailAgenda.findUnique({
      where: {
        uuid,
      },
    });
    if (!exist) throw new HttpException('Detail Agenda not found', 404);

    if (start && finish) {
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
            typeAgendaId: getTypeAgenda.id,
            isDone: Boolean(isDone),
            notulen: files?.notulen?.[0]?.filename || undefined,
            absent: files?.absent?.[0]?.filename || undefined,
          },
        });

        await this.prisma.departmentAgenda.deleteMany({
          where: {
            detailAgendaId: exist.id,
          },
        });

        const getDepartments = await this.prisma.department.findMany({
          where: {
            uuid: {
              in: departmentsUuid,
            },
          },
        });
        const getIdDepartments = getDepartments.map(
          (department) => department.id,
        );

        const dataForCreateDepartmentAgenda = [];
        getIdDepartments.forEach((id) => {
          dataForCreateDepartmentAgenda.push({
            departmentId: id,
            detailAgendaId: result.id,
          });
        });

        await this.prisma.departmentAgenda.createMany({
          data: dataForCreateDepartmentAgenda,
        });

        if (!result) throw new HttpException('internal server error', 500);

        return result;
      } catch (error) {
        throw new HttpException(error.message, 500);
      }
    } else {
      try {
        const result = await this.prisma.detailAgenda.update({
          where: {
            uuid,
          },
          data: {
            title,
            description,
            isDone: Boolean(isDone),
            notulen: files?.notulen?.[0]?.filename || undefined,
            absent: files?.absent?.[0]?.filename || undefined,
          },
        });

        await this.prisma.departmentAgenda.deleteMany({
          where: {
            detailAgendaId: exist.id,
          },
        });

        const getDepartments = await this.prisma.department.findMany({
          where: {
            uuid: {
              in: departmentsUuid,
            },
          },
        });
        const getIdDepartments = getDepartments.map(
          (department) => department.id,
        );

        const dataForCreateDepartmentAgenda = [];
        getIdDepartments.forEach((id) => {
          dataForCreateDepartmentAgenda.push({
            departmentId: id,
            detailAgendaId: result.id,
          });
        });

        await this.prisma.departmentAgenda.createMany({
          data: dataForCreateDepartmentAgenda,
        });

        if (!result) throw new HttpException('internal server error', 500);

        return result;
      } catch (error) {
        throw new HttpException(error.message, 500);
      }
    }
  }

  async removeDetailAgenda(uuid: string) {
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
    try {
      const date = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
      if (!date)
        throw new HttpException(
          `Invalid format for ${fieldName}, use yyyy-MM-dd HH:mm:ss`,
          400,
        );
      return date;
    } catch (e) {
      return undefined;
    }
  }
}
