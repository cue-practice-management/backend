import { Module } from '@nestjs/common';
import { CompanyMentorService } from './company-mentor.service';

@Module({
  providers: [CompanyMentorService]
})
export class CompanyMentorModule {}
