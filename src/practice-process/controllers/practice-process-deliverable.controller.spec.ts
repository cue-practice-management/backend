import { Test, TestingModule } from '@nestjs/testing';
import { PracticeProcessDeliverableController } from './practice-process-deliverable.controller';

describe('PracticeProcessDeliverableController', () => {
  let controller: PracticeProcessDeliverableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeProcessDeliverableController],
    }).compile();

    controller = module.get<PracticeProcessDeliverableController>(PracticeProcessDeliverableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
