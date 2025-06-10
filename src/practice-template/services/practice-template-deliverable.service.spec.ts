import { Test, TestingModule } from '@nestjs/testing';
import { PracticeTemplateDeliverableService } from './practice-template-deliverable.service';

describe('PracticeTemplateDeliverableService', () => {
  let service: PracticeTemplateDeliverableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PracticeTemplateDeliverableService],
    }).compile();

    service = module.get<PracticeTemplateDeliverableService>(PracticeTemplateDeliverableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
