import { Test, TestingModule } from '@nestjs/testing';
import { StudentCompanyContractController } from './student-company-contract.controller';

describe('StudentCompanyContractController', () => {
  let controller: StudentCompanyContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentCompanyContractController],
    }).compile();

    controller = module.get<StudentCompanyContractController>(StudentCompanyContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
