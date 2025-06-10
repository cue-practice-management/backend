import { Body, Controller, Post } from '@nestjs/common';
import { PracticeTemplateService } from './practice-template.service';
import { PracticeTemplateResponseDto } from './dtos/practice-template-response.dto';
import { CreatePracticeTemplateRequestDto } from './dtos/create-practice-template-request.dto';

@Controller('practice-templates')
export class PracticeTemplateController {

    constructor(private readonly practiceTemplateService: PracticeTemplateService) { }

    @Post('create')
    async create(
        @Body() dto: CreatePracticeTemplateRequestDto,
    ): Promise<PracticeTemplateResponseDto> {
        return this.practiceTemplateService.createTemplate(dto);
    }
}
