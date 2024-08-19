import { Test, TestingModule } from '@nestjs/testing';
import { TypeAgendaService } from './type-agenda.service';

describe('TypeAgendaService', () => {
  let service: TypeAgendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeAgendaService],
    }).compile();

    service = module.get<TypeAgendaService>(TypeAgendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
