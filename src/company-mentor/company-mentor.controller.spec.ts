import { Test, TestingModule } from '@nestjs/testing';
import { CompanyMentorController } from './company-mentor.controller';

describe('CompanyMentorController', () => {
  let controller: CompanyMentorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyMentorController],
    }).compile();

    controller = module.get<CompanyMentorController>(CompanyMentorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
