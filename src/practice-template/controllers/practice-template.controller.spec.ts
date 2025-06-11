import { Test, TestingModule } from '@nestjs/testing';
import { PracticeTemplateController } from './practice-template.controller';

describe('PracticeTemplateController', () => {
  let controller: PracticeTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeTemplateController],
    }).compile();

    controller = module.get<PracticeTemplateController>(PracticeTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
