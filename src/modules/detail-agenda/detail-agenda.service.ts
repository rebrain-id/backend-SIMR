import { Injectable } from '@nestjs/common';
import { CreateDetailAgendumDto } from './dto/create-detail-agendum.dto';
import { UpdateDetailAgendumDto } from './dto/update-detail-agendum.dto';

@Injectable()
export class DetailAgendaService {
  create(createDetailAgendumDto: CreateDetailAgendumDto) {
    return 'This action adds a new detailAgendum';
  }

  findAll() {
    return `This action returns all detailAgenda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailAgendum`;
  }

  update(id: number, updateDetailAgendumDto: UpdateDetailAgendumDto) {
    return `This action updates a #${id} detailAgendum`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailAgendum`;
  }
}
