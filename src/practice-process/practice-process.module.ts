import { Module } from '@nestjs/common';
import { PracticeProcessService } from './services/practice-process.service';

@Module({
  providers: [PracticeProcessService]
})
export class PracticeProcessModule {}
