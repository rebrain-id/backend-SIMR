import { Test, TestingModule } from '@nestjs/testing';
import { TypeAgendaController } from './type-agenda.controller';
import { TypeAgendaService } from './type-agenda.service';

describe('TypeAgendaController', () => {
  let controller: TypeAgendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeAgendaController],
      providers: [TypeAgendaService],
    }).compile();

    controller = module.get<TypeAgendaController>(TypeAgendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
