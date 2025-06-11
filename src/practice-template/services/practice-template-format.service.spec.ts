import { Test, TestingModule } from '@nestjs/testing';
import { PracticeTemplateFormatService } from './practice-template-format.service';

describe('PracticeTemplateFormatService', () => {
  let service: PracticeTemplateFormatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PracticeTemplateFormatService],
    }).compile();

    service = module.get<PracticeTemplateFormatService>(PracticeTemplateFormatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
