import { Test, TestingModule } from '@nestjs/testing';
import { PracticeProcessFollowUpController } from './practice-process-follow-up.controller';

describe('PracticeProcessFollowUpController', () => {
  let controller: PracticeProcessFollowUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeProcessFollowUpController],
    }).compile();

    controller = module.get<PracticeProcessFollowUpController>(PracticeProcessFollowUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
