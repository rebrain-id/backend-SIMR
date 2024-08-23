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

@Injectable()
export class DetailAgendaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDetailAgendumDto: CreateDetailAgendumDto,
  ): Promise<DetailAgendum> {
    const { title, description, start, finish, typeAgendaUuid } =
      createDetailAgendumDto;

    const typeAgenda: TypeAgenda = await this.prisma.typeAgenda.findUnique({
      where: {
        uuid: typeAgendaUuid,
      },
    });
    if (!typeAgenda) throw new HttpException('Type Agenda not found', 404);

    const startDate = this.parseDate(start, 'start');
    const endDate = this.parseDate(finish, 'finish');

    try {
      const result: DetailAgendum = await this.prisma.detailAgenda.create({
        data: {
          title,
          description,
          start: startDate,
          finish: endDate,
          typeAgendaId: typeAgenda.id,
        },
        select: selectedFieldDetailAgenda(),
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<DetailAgendum[]> {
    const result: DetailAgendum[] = await this.prisma.detailAgenda.findMany({
      select: selectedFieldDetailAgenda(),
    });

    if (result.length === 0)
      throw new HttpException('Detail Agenda not found', 404);
    return result;
  }

  async findOne(uuid: string): Promise<any> {
    const result = this.prisma.detailAgenda.findUnique({
      where: {
        uuid,
      },
      select: selectedFieldDetailAgenda(),
    });

    if (!result) throw new HttpException('Detail Agenda not found', 404);

    return result;
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
      const result: DetailAgendum = await this.prisma.detailAgenda.update({
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
    const exists: DetailAgendum = await this.prisma.detailAgenda.findUnique({
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
