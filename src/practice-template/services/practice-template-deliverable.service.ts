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
import { PracticeDeliverableTemplateNotFoundException } from 'practice-template/exceptions/practice-deliverable-template-not-found.exception';
import { UpdatePracticeTemplateDeliverableRequestDto } from 'practice-template/dtos/update-practice-template-deliverable-request.dto';

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

    async getPracticeTemplateDeliverablesByCriteria(
        filter: PracticeDeliverableTemplateFilterDto
    ): Promise<PaginatedResult<PracticeTemplateDeliverableResponseDto>> {
        const { page, limit, sortBy, sortOrder } = filter;

        const query: any = {};
        if (filter) query.template = filter.template;
        if (filter.title) query.title = { $regex: filter.title, $options: 'i' };
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

    async updatePracticeTemplateDeliverable(
        practiceTemplateDeliverableId: string,
        dto: UpdatePracticeTemplateDeliverableRequestDto,
    ): Promise<PracticeTemplateDeliverableResponseDto> {
        const deliverable = await this.practiceTemplateDeliverableModel.findById(practiceTemplateDeliverableId);

        if (!deliverable) throw new PracticeDeliverableTemplateNotFoundException();

        Object.assign(deliverable, dto);
        const updatedDeliverable = await deliverable.save();

        return this.practiceTemplateDeliverableMapper.toResponseDto(updatedDeliverable);
    }


    async deletePracticeTemplateDeliverable(
        practiceTemplateDeliverableId: string,
    ): Promise<void> {
        const deliverable = await this.practiceTemplateDeliverableModel.findByIdAndDelete(practiceTemplateDeliverableId);

        if (!deliverable) throw new PracticeDeliverableTemplateNotFoundException();
    }


}
