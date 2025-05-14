import { Test, TestingModule } from '@nestjs/testing';
import { AcademicProgramService } from './academic-program.service';

describe('AcademicProgramService', () => {
  let service: AcademicProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicProgramService],
    }).compile();

    service = module.get<AcademicProgramService>(AcademicProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
