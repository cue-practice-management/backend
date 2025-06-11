import { Test, TestingModule } from '@nestjs/testing';
import { PracticeTemplateDeliverablesController } from './practice-template-deliverables.controller';

describe('PracticeTemplateDeliverablesController', () => {
  let controller: PracticeTemplateDeliverablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeTemplateDeliverablesController],
    }).compile();

    controller = module.get<PracticeTemplateDeliverablesController>(PracticeTemplateDeliverablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
