import { Test, TestingModule } from '@nestjs/testing';
import { PracticeTemplateFormatController } from './practice-template-format.controller';

describe('PracticeTemplateFormatController', () => {
  let controller: PracticeTemplateFormatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeTemplateFormatController],
    }).compile();

    controller = module.get<PracticeTemplateFormatController>(PracticeTemplateFormatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
