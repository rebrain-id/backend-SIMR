import { HttpException, Injectable } from '@nestjs/common';
import { CreateTypeAgendumDto } from './dto/create-type-agendum.dto';
import { UpdateTypeAgendumDto } from './dto/update-type-agendum.dto';
import { PrismaService } from '../../prisma/prisma.service';
import {
  selectedFieldTypeAgenda,
  TypeAgenda,
} from './entities/type-agendum.entity';

@Injectable()
export class TypeAgendaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTypeAgendumDto: CreateTypeAgendumDto,
  ): Promise<TypeAgenda> {
    const { name } = createTypeAgendumDto;

    const exists = await this.prisma.typeAgenda.findFirst({
      where: { name },
    });
    if (exists) {
      throw new HttpException('Type Agenda already exists', 400);
    }
    try {
      const result = await this.prisma.typeAgenda.create({
        data: {
          name,
        },
        select: selectedFieldTypeAgenda(),
      });
      return result;
    } catch (error) {
      throw new HttpException('failed create Type Agenda', 500);
    }
  }

  async findAll(): Promise<TypeAgenda[]> {
    const result = await this.prisma.typeAgenda.findMany({
      select: selectedFieldTypeAgenda(),
    });

    if (result.length === 0) {
      throw new HttpException('Type Agenda not found', 404);
    }

    return result;
  }

  async findOne(uuid: string): Promise<TypeAgenda> {
    const result = await this.prisma.typeAgenda.findUnique({
      where: {
        uuid,
      },
      select: selectedFieldTypeAgenda(),
    });

    if (!result) {
      throw new HttpException('Type Agenda not found', 404);
    }
    return result;
  }

  async update(
    uuid: string,
    updateTypeAgendumDto: UpdateTypeAgendumDto,
  ): Promise<TypeAgenda> {
    const { name } = updateTypeAgendumDto;

    const exists: TypeAgenda = await this.prisma.typeAgenda.findUnique({
      where: { uuid },
    });

    if (!exists) throw new HttpException('Type Agenda not found', 404);

    try {
      const result: TypeAgenda = await this.prisma.typeAgenda.update({
        where: { uuid },
        data: {
          name,
        },
        select: selectedFieldTypeAgenda(),
      });

      return result;
    } catch (error) {
      throw new HttpException('failed update Type Agenda', 500);
    }
  }

  async remove(uuid: string): Promise<string> {
    const exists: TypeAgenda = await this.prisma.typeAgenda.findUnique({
      where: { uuid },
    });

    if (!exists) throw new HttpException('Type Agenda not found', 404);
    try {
      await this.prisma.typeAgenda.delete({ where: { uuid } });

      return 'success delete type agenda with uuid: ' + uuid;
    } catch (error) {
      throw new HttpException('failed delete Type Agenda', 500);
    }
  }
}
