import { Test, TestingModule } from '@nestjs/testing';
import { PracticeProcessFollowUpService } from './practice-process-follow-up.service';

describe('PracticeProcessFollowUpService', () => {
  let service: PracticeProcessFollowUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PracticeProcessFollowUpService],
    }).compile();

    service = module.get<PracticeProcessFollowUpService>(PracticeProcessFollowUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
