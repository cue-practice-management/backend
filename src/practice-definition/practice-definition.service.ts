import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PracticeDefinition, PracticeDefinitionDocument } from './schemas/practice-definition.schema';
import { PaginateModel } from 'mongoose';
import { PracticeDefinitionMapper } from './mappers/practice-definition.mapper';
import { AcademicProgramService } from '@academic-program/academic-program.service';
import { PracticeTemplateService } from 'practice-template/services/practice-template.service';
import { PracticeDefinitionReponseDto } from './dtos/practice-defintion-response.dto';
import { CreatePracticeDefinitionRequestDto } from './dtos/create-practice-defintion-request.dto';
import { PRACTICE_DEFINITION_DEFAULT_SORT, PRACTICE_DEFINITION_POPULATE_OPTIONS, PRACTICE_DEFINITION_SORT_OPTIONS } from './constants/practice-definition.constants';
import { PracticeDefinitionFilterDto } from './dtos/practice-definition-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { getSort } from '@common/utils/pagination.util';
import { UpdatePracticeDefinitionRequestDto } from './dtos/update-practice-definition-request.dto';
import { PracticeDefinitionNotFoundException } from './exceptions/practice-definition-not-found.exception';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';

@Injectable()
export class PracticeDefinitionService {

    constructor(
        @InjectModel(PracticeDefinition.name)
        private readonly practiceDefinitionModel: PaginateModel<PracticeDefinitionDocument>,
        private readonly practiceDefinitionMapper: PracticeDefinitionMapper,
        private readonly academicProgramService: AcademicProgramService,
        private readonly practiceTemplateService: PracticeTemplateService,
    ) { }

    async createPracticeDefinition(practiceDefinitionDto: CreatePracticeDefinitionRequestDto): Promise<PracticeDefinitionReponseDto> {
        await this.academicProgramService.validateAcademicProgramExists(practiceDefinitionDto.academicProgram);
        await this.practiceTemplateService.validateTemplateExists(practiceDefinitionDto.practiceTemplate);

        const practiceDefinition = new this.practiceDefinitionModel(practiceDefinitionDto);
        const savedPracticeDefinition = await practiceDefinition.save();
        await savedPracticeDefinition.populate([
            PRACTICE_DEFINITION_POPULATE_OPTIONS.ACADEMIC_PROGRAM,
            PRACTICE_DEFINITION_POPULATE_OPTIONS.PRACTICE_TEMPLATE
        ])

        return this.practiceDefinitionMapper.toResponseDto(savedPracticeDefinition);
    }

    async getPracticeDefinitionsByCriteria(filter: PracticeDefinitionFilterDto): Promise<PaginatedResult<PracticeDefinitionReponseDto>> {
        const { page, limit, sortBy, sortOrder, name, academicProgram } = filter;

        const query: any = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (academicProgram) {
            query.academicProgram = academicProgram;
        }

        const options = {
            page,
            limit,
            sort: getSort(
                PRACTICE_DEFINITION_SORT_OPTIONS,
                PRACTICE_DEFINITION_DEFAULT_SORT,
                sortBy,
                sortOrder
            ),
            populate: [
                PRACTICE_DEFINITION_POPULATE_OPTIONS.ACADEMIC_PROGRAM,
                PRACTICE_DEFINITION_POPULATE_OPTIONS.PRACTICE_TEMPLATE
            ]
        };

        const paginatedResult = await this.practiceDefinitionModel.paginate(query, options);

        return this.practiceDefinitionMapper.toPaginatedResponseDto(paginatedResult);
    }

    async getPracticeDefinitionById(id: string): Promise<PracticeDefinitionReponseDto> {
        const practiceDefinition = await this.practiceDefinitionModel.findById(id)
            .populate([
                PRACTICE_DEFINITION_POPULATE_OPTIONS.ACADEMIC_PROGRAM,
                PRACTICE_DEFINITION_POPULATE_OPTIONS.PRACTICE_TEMPLATE
            ]);

        if (!practiceDefinition) throw new PracticeDefinitionNotFoundException();

        return this.practiceDefinitionMapper.toResponseDto(practiceDefinition);
    }

    async getPracticeDefinitionsTypeahead(query: string): Promise<TypeaheadItem[]> {
        const practiceDefinitions = await this.practiceDefinitionModel.find({
            name: { $regex: query, $options: 'i' }
        });

        return practiceDefinitions.map(practiceDefinition =>
            this.practiceDefinitionMapper.toTypeaheadItem(practiceDefinition)
        );
    }

    async updatePracticeDefinition(id: string, updateData: UpdatePracticeDefinitionRequestDto): Promise<PracticeDefinitionReponseDto> {
        const practiceDefinition = await this.practiceDefinitionModel.findById(id);

        if (!practiceDefinition) throw new PracticeDefinitionNotFoundException();

        if (updateData.academicProgram) await this.academicProgramService.validateAcademicProgramExists(updateData.academicProgram);
        if (updateData.practiceTemplate) await this.practiceTemplateService.validateTemplateExists(updateData.practiceTemplate);

        Object.assign(practiceDefinition, updateData);

        const updatedPracticeDefinition = await practiceDefinition.save();
        await updatedPracticeDefinition.populate([
            PRACTICE_DEFINITION_POPULATE_OPTIONS.ACADEMIC_PROGRAM,
            PRACTICE_DEFINITION_POPULATE_OPTIONS.PRACTICE_TEMPLATE
        ]);


        return this.practiceDefinitionMapper.toResponseDto(updatedPracticeDefinition);
    }

    async deletePracticeDefinition(id: string): Promise<void> {
        const practiceDefinition = await this.practiceDefinitionModel.findById(id);

        if (!practiceDefinition) throw new PracticeDefinitionNotFoundException();

        await practiceDefinition.softDelete();
    }
}
