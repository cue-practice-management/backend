import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreatePracticeTemplateDeliverableRequestDto } from 'practice-template/dtos/create-practice-template-deliverable-request.dto';
import { PracticeTemplateDeliverableResponseDto } from 'practice-template/dtos/practice-template-delliverable-response.dto';
import { PracticeTemplateDeliverableMapper } from 'practice-template/mappers/practice-template-deliverable.mapper';
import { PracticeTemplateDeliverable, PracticeTemplateDeliverableDocument } from 'practice-template/schemas/practice-template-deliverable.schema';
import { PracticeTemplateService } from './practice-template.service';
import { PracticeDeliverableTemplateFilterDto } from 'practice-template/dtos/practice-template-deliverable-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { getSort } from '@common/utils/pagination.util';
import { DEFAULT_PRACTICE_TEMPLATE_DELIVERABLE_SORT_OPTION, PRACTICE_TEMPLATE_DELIVERABLE_SORT_OPTIONS } from 'practice-template/constants/practice-template-deliverable.constants';

@Injectable()
export class PracticeTemplateDeliverableService {

    constructor(
        @InjectModel(PracticeTemplateDeliverable.name)
        private readonly practiceTemplateDeliverableModel: PaginateModel<PracticeTemplateDeliverableDocument>,
        private readonly practiceTemplateDeliverableMapper: PracticeTemplateDeliverableMapper,
        private readonly practiceTemplateService: PracticeTemplateService,
    ) { }

    async createPracticeTemplateDeliverable(
        dto: CreatePracticeTemplateDeliverableRequestDto,
    ): Promise<PracticeTemplateDeliverableResponseDto> {
        await this.practiceTemplateService.validateTemplateExists(dto.template);

        const deliverable = new this.practiceTemplateDeliverableModel(dto);
        const savedDeliverable = await deliverable.save();

        return this.practiceTemplateDeliverableMapper.toResponseDto(savedDeliverable);
    }

    async getByCriteria(
        filter: PracticeDeliverableTemplateFilterDto
    ): Promise<PaginatedResult<PracticeTemplateDeliverableResponseDto>> {
        const { page, limit, sortBy, sortOrder } = filter;

        const query: any = {};
        if (filter) query.template = filter.template;
        const sort = getSort(
            PRACTICE_TEMPLATE_DELIVERABLE_SORT_OPTIONS,
            DEFAULT_PRACTICE_TEMPLATE_DELIVERABLE_SORT_OPTION,
            sortBy,
            sortOrder,
        );

        const result = await this.practiceTemplateDeliverableModel.paginate(query, {
            page,
            limit,
            sort
        });

        return this.practiceTemplateDeliverableMapper.toPaginatedResponseDto(result);
    }


}
