import { Test, TestingModule } from '@nestjs/testing';
import { DetailAgendaController } from './detail-agenda.controller';
import { DetailAgendaService } from './detail-agenda.service';

describe('DetailAgendaController', () => {
  let controller: DetailAgendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailAgendaController],
      providers: [DetailAgendaService],
    }).compile();

    controller = module.get<DetailAgendaController>(DetailAgendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
