import { Test, TestingModule } from '@nestjs/testing';
import { DetailAgendaService } from './detail-agenda.service';

describe('DetailAgendaService', () => {
  let service: DetailAgendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailAgendaService],
    }).compile();

    service = module.get<DetailAgendaService>(DetailAgendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
