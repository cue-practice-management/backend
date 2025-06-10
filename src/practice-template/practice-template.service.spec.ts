import { Test, TestingModule } from '@nestjs/testing';
import { PracticeTemplateService } from './practice-template.service';

describe('PracticeTemplateService', () => {
  let service: PracticeTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PracticeTemplateService],
    }).compile();

    service = module.get<PracticeTemplateService>(PracticeTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
