import { Test, TestingModule } from '@nestjs/testing';
import { CompanyContractService } from './company-contract.service';

describe('CompanyContractService', () => {
  let service: CompanyContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyContractService],
    }).compile();

    service = module.get<CompanyContractService>(CompanyContractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
