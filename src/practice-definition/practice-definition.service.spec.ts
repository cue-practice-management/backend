import { Test, TestingModule } from '@nestjs/testing';
import { PracticeDefinitionService } from './practice-definition.service';

describe('PracticeDefinitionService', () => {
  let service: PracticeDefinitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PracticeDefinitionService],
    }).compile();

    service = module.get<PracticeDefinitionService>(PracticeDefinitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
