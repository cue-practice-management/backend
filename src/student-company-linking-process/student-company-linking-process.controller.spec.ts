import { Test, TestingModule } from '@nestjs/testing';
import { StudentCompanyLinkingProcessController } from './student-company-linking-process.controller';

describe('StudentCompanyLinkingProcessController', () => {
  let controller: StudentCompanyLinkingProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentCompanyLinkingProcessController],
    }).compile();

    controller = module.get<StudentCompanyLinkingProcessController>(StudentCompanyLinkingProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
