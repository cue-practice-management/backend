import { Test, TestingModule } from '@nestjs/testing';
import { PracticeDefinitionController } from './practice-definition.controller';

describe('PracticeDefinitionController', () => {
  let controller: PracticeDefinitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeDefinitionController],
    }).compile();

    controller = module.get<PracticeDefinitionController>(PracticeDefinitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
