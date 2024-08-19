import { Injectable } from '@nestjs/common';
import { CreateTypeAgendumDto } from './dto/create-type-agendum.dto';
import { UpdateTypeAgendumDto } from './dto/update-type-agendum.dto';

@Injectable()
export class TypeAgendaService {
  create(createTypeAgendumDto: CreateTypeAgendumDto) {
    return 'This action adds a new typeAgendum';
  }

  findAll() {
    return `This action returns all typeAgenda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeAgendum`;
  }

  update(id: number, updateTypeAgendumDto: UpdateTypeAgendumDto) {
    return `This action updates a #${id} typeAgendum`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeAgendum`;
  }
}
