import { Injectable } from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';

@Injectable()
export class LecturerService {
  create(createLecturerDto: CreateLecturerDto) {
    return 'This action adds a new lecturer';
  }

  findAll() {
    return `This action returns all lecturer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lecturer`;
  }

  update(id: number, updateLecturerDto: UpdateLecturerDto) {
    return `This action updates a #${id} lecturer`;
  }

  remove(id: number) {
    return `This action removes a #${id} lecturer`;
  }
}
