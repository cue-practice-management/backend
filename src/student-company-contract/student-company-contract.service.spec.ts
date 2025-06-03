import { Test, TestingModule } from '@nestjs/testing';
import { StudentCompanyContractService } from './student-company-contract.service';

describe('StudentCompanyContractService', () => {
  let service: StudentCompanyContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentCompanyContractService],
    }).compile();

    service = module.get<StudentCompanyContractService>(StudentCompanyContractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
