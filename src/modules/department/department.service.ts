import { HttpException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../../prisma/prisma.service';
import {
  Department,
  selectedFieldDepartment,
} from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
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

  async findAll(): Promise<Department[]> {
    const result = await this.prisma.department.findMany({
      select: selectedFieldDepartment(),
    });

    if (result.length === 0) {
      throw new HttpException('Department not found', 404);
    }

    try {
      return result;
    } catch (error) {
      throw new HttpException('Failed get all Department', 500);
    }
  }

  async findOne(uuid: string): Promise<Department> {
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

  async update(
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

  async remove(uuid: string): Promise<string> {
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
