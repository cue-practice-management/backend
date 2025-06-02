import { Test, TestingModule } from '@nestjs/testing';
import { StudentCompanyLinkingProcessService } from './student-company-linking-process.service';

describe('StudentCompanyLinkingProcessService', () => {
  let service: StudentCompanyLinkingProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentCompanyLinkingProcessService],
    }).compile();

    service = module.get<StudentCompanyLinkingProcessService>(StudentCompanyLinkingProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
