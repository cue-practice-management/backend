import { Test, TestingModule } from '@nestjs/testing';
import { CompanyMentorService } from './company-mentor.service';

describe('CompanyMentorService', () => {
  let service: CompanyMentorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyMentorService],
    }).compile();

    service = module.get<CompanyMentorService>(CompanyMentorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
