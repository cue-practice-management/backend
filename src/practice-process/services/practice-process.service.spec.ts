import { Test, TestingModule } from '@nestjs/testing';
import { PracticeProcessService } from './practice-process.service';

describe('PracticeProcessService', () => {
  let service: PracticeProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PracticeProcessService],
    }).compile();

    service = module.get<PracticeProcessService>(PracticeProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
