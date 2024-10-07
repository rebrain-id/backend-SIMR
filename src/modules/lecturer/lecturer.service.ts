import { HttpException, Injectable } from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Lecturer, selectedFieldLecturer } from './entities/lecturer.entity';
import { QueryLecturerDto } from './dto/query-lecturer.dto';

@Injectable()
export class LecturerService {
  constructor(private readonly prisma: PrismaService) {}

  async createLecturer(
    createLecturerDto: CreateLecturerDto,
  ): Promise<Lecturer> {
    const { name, email, phoneNumber, departmentUuid } = createLecturerDto;

    const exists = await this.prisma.lecturer.findFirst({
      where: { name },
    });

    if (exists) {
      throw new HttpException('Lecturer already exists', 400);
    }

    const department = await this.prisma.department.findUnique({
      where: { uuid: departmentUuid },
    });

    if (!department) {
      throw new HttpException('Department not found', 404);
    }

    try {
      const result = await this.prisma.lecturer.create({
        data: {
          name,
          email,
          phoneNumber,
          departmentId: department.id,
        },
        select: selectedFieldLecturer(),
      });

      return result;
    } catch (error) {
      throw new HttpException('Failed create Lecturer', 500);
    }
  }

  async findAllLecturer(
    query: QueryLecturerDto,
  ): Promise<{ result: Lecturer[]; totalData: number }> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const totalData = await this.prisma.lecturer.count({
      where: {
        name: query.name ? { equals: query.name } : { contains: '' },
        department: query.department
          ? { name: { equals: query.department } }
          : { name: { contains: '' } },
      },
    });

    const result = await this.prisma.lecturer.findMany({
      where: {
        name: query.name ? { equals: query.name } : { contains: '' },
        department: query.department
          ? { name: { equals: query.department } }
          : { name: { contains: '' } },
      },
      skip: offset,
      take: limit,
      select: selectedFieldLecturer(),
    });

    if (result.length === 0) {
      throw new HttpException('Lecturer not found', 404);
    }

    try {
      return { result, totalData };
    } catch (error) {
      throw new HttpException('Failed get all Lecturer', 500);
    }
  }

  async findOneLecturer(uuid: string): Promise<Lecturer> {
    const result = await this.prisma.lecturer.findUnique({
      where: {
        uuid,
      },
      select: selectedFieldLecturer(),
    });

    if (!result) {
      throw new HttpException('Lecturer not found', 404);
    }

    try {
      return result;
    } catch (error) {
      throw new HttpException('Failed get Lecturer', 500);
    }
  }

  async updateLecturer(
    uuid: string,
    updateLecturerDto: UpdateLecturerDto,
  ): Promise<Lecturer> {
    const { name, email, phoneNumber, departmentUuid } = updateLecturerDto;

    const exists = await this.prisma.lecturer.findUnique({
      where: { uuid },
    });

    if (!exists) {
      throw new HttpException('Lecturer not found', 404);
    }

    const department = await this.prisma.department.findUnique({
      where: { uuid: departmentUuid },
    });

    if (!department) {
      throw new HttpException('Department not found', 404);
    }

    try {
      const result = await this.prisma.lecturer.update({
        where: { uuid },
        data: {
          name,
          email,
          phoneNumber,
          departmentId: department.id,
        },
        select: selectedFieldLecturer(),
      });

      return result;
    } catch (error) {
      throw new HttpException('Failed update Lecturer', 500);
    }
  }

  async removeLecturer(uuid: string): Promise<string> {
    const exists = await this.prisma.lecturer.findUnique({
      where: { uuid },
    });

    if (!exists) {
      throw new HttpException('Lecturer not found', 404);
    }

    try {
      await this.prisma.lecturer.delete({ where: { uuid } });
      return `Success delete Lecturer with uuid: ${uuid}`;
    } catch (error) {
      throw new HttpException('Failed delete Lecturer', 500);
    }
  }
}
