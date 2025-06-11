import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PracticeDefinition } from './schemas/practice-definition.schema';
import { PaginateModel } from 'mongoose';
import { PracticeDefinitionMapper } from './mappers/practice-definition.mapper';
import { AcademicProgramService } from '@academic-program/academic-program.service';
import { PracticeTemplateService } from 'practice-template/services/practice-template.service';
import { PracticeDefinitionReponseDto } from './dtos/practice-defintion-response.dto';
import { CreatePracticeDefinitionRequestDto } from './dtos/create-practice-defintion-request.dto';
import { PRACTICE_DEFINITION_POPULATE_OPTIONS } from './constants/practice-definition.constants';

@Injectable()
export class PracticeDefinitionService {

    constructor(
        @InjectModel(PracticeDefinition.name)
        private readonly practiceDefinitionModel: PaginateModel<PracticeDefinition>,
        private readonly practiceDefinitionMapper: PracticeDefinitionMapper,
        private readonly academicProgramService: AcademicProgramService,
        private readonly practiceTemplateService: PracticeTemplateService,
    ){}

    async createPracticeDefinition(practiceDefinitionDto: CreatePracticeDefinitionRequestDto): Promise<PracticeDefinitionReponseDto> {
        this.academicProgramService.validateAcademicProgramExists(practiceDefinitionDto.academicProgram);
        this.practiceTemplateService.validateTemplateExists(practiceDefinitionDto.practiceTemplate);

        const practiceDefinition = new this.practiceDefinitionModel(practiceDefinitionDto);
        const savedPracticeDefinition = await practiceDefinition.save();
        savedPracticeDefinition.populate([
            PRACTICE_DEFINITION_POPULATE_OPTIONS.ACADEMIC_PROGRAM,
            PRACTICE_DEFINITION_POPULATE_OPTIONS.PRACTICE_TEMPLATE
        ])

        return this.practiceDefinitionMapper.toResponseDto(savedPracticeDefinition);
    }
}
