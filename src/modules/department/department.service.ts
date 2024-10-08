import { HttpException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../../prisma/prisma.service';
import {
  Department,
  selectedFieldDepartment,
} from './entities/department.entity';
import { QueryDepartmentDto } from './dto/query-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    const { name } = createDepartmentDto;

    const exists = await this.prisma.department.findFirst({
      where: { name },
    });

    if (exists) {
      throw new HttpException('Department already exists', 400);
    }

    try {
      const result = await this.prisma.department.create({
        data: {
          name,
        },
        select: selectedFieldDepartment(),
      });

      return result;
    } catch (error) {
      throw new HttpException('Failed create Department', 500);
    }
  }

  async findAllDepartment(
    query: QueryDepartmentDto,
  ): Promise<{ result: Department[]; totalData: number }> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const totalData = await this.prisma.department.count({
      where: {
        name: query.name ? { contains: query.name } : { contains: '' },
      },
    });

    const result = await this.prisma.department.findMany({
      where: {
        name: query.name ? { contains: query.name } : { contains: '' },
      },
      skip: offset,
      take: limit,
      select: selectedFieldDepartment(),
    });

    if (result.length === 0) {
      throw new HttpException('Department not found', 404);
    }

    try {
      return { result, totalData };
    } catch (error) {
      throw new HttpException('Failed get all Department', 500);
    }
  }

  async findOneDepartment(uuid: string): Promise<Department> {
    const result = await this.prisma.department.findUnique({
      where: {
        uuid,
      },
      select: selectedFieldDepartment(),
    });

    if (!result) {
      throw new HttpException('Department not found', 404);
    }

    try {
      return result;
    } catch (error) {
      throw new HttpException('Failed get Department', 500);
    }
  }

  async updateDepartment(
    uuid: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const { name } = updateDepartmentDto;

    const exists: Department = await this.prisma.department.findUnique({
      where: { uuid },
    });

    if (!exists) throw new HttpException('Department not found', 404);

    try {
      const result: Department = await this.prisma.department.update({
        where: { uuid },
        data: {
          name,
        },
        select: selectedFieldDepartment(),
      });

      return result;
    } catch (error) {
      throw new HttpException('Failed update Department', 500);
    }
  }

  async removeDepartment(uuid: string): Promise<string> {
    const exists: Department = await this.prisma.department.findUnique({
      where: { uuid },
    });

    if (!exists) throw new HttpException('Department not found', 404);

    try {
      await this.prisma.department.delete({ where: { uuid } });
      return 'Success delete Department with uuid: ' + uuid;
    } catch (error) {
      throw new HttpException('Failed delete Department', 500);
    }
  }
}
