import { Test, TestingModule } from '@nestjs/testing';
import { PracticeProcessController } from './practice-process.controller';

describe('PracticeProcessController', () => {
  let controller: PracticeProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeProcessController],
    }).compile();

    controller = module.get<PracticeProcessController>(PracticeProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
