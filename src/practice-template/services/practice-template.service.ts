import { Injectable } from '@nestjs/common';
import { PaginateModel, PaginateResult } from 'mongoose';
import { getSort } from '@common/utils/pagination.util';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MAX_TYPEAHEAD_ITEMS } from '@common/constants/constaint.constants';
import { PaginatedResult } from '@common/types/paginated-result';
import { CreatePracticeTemplateRequestDto } from 'practice-template/dtos/create-practice-template-request.dto';
import { PracticeTemplateMapper } from 'practice-template/mappers/practice-template-mapper';
import { PracticeTemplateResponseDto } from 'practice-template/dtos/practice-template-response.dto';
import { DEFAULT_PRACTICE_TEMPLATE_SORT_OPTION, PRACTICE_TEMPLATE_POPULATE_OPTIONS, PRACTICE_TEMPLATE_SORT_OPTIONS } from 'practice-template/constants/practice-template.constants';
import { PracticeTemplateFilterDto } from 'practice-template/dtos/practice-template-filter.dto';
import { UpdatePracticeTemplateRequestDto } from 'practice-template/dtos/update-practice-template-request.dto';
import { PracticeTemplateNotFoundException } from 'practice-template/exceptions/practice-template-not-found.exception';
import { PracticeTemplate, PracticeTemplateDocument } from 'practice-template/schemas/practice-template.schema';

@Injectable()
export class PracticeTemplateService {
    constructor(
        @InjectModel(PracticeTemplate.name)
        private readonly templateModel: PaginateModel<PracticeTemplateDocument>,
        private readonly mapper: PracticeTemplateMapper,
    ) { }

    async createTemplate(
        dto: CreatePracticeTemplateRequestDto,
    ): Promise<PracticeTemplateResponseDto> {
        const doc = new this.templateModel(dto);
        const saved = await doc.save();
        const populated = await saved
            .populate([
                PRACTICE_TEMPLATE_POPULATE_OPTIONS.DELIVERABLES,
                PRACTICE_TEMPLATE_POPULATE_OPTIONS.FORMATS]);

        return this.mapper.toResponseDto(populated);
    }

    async getTemplateById(id: string): Promise<PracticeTemplateResponseDto> {
        const doc = await this.templateModel
            .findById(id)
            .populate('deliverables')
            .populate('formats')
            .exec();
        if (!doc) throw new PracticeTemplateNotFoundException();
        return this.mapper.toResponseDto(doc);
    }

    async getByCriteria(
        filter: PracticeTemplateFilterDto,
    ): Promise<PaginatedResult<PracticeTemplateResponseDto>> {
        const { page, limit, sortBy, sortOrder, name } = filter;
        const query: any = {};
        if (name) query.name = new RegExp(name, 'i');

        const sort = getSort(
            PRACTICE_TEMPLATE_SORT_OPTIONS,
            DEFAULT_PRACTICE_TEMPLATE_SORT_OPTION,
            sortBy,
            sortOrder,
        );

        const result: PaginateResult<PracticeTemplateDocument> = await this.templateModel.paginate(query, {
            page, limit, sort,
            populate: [
                PRACTICE_TEMPLATE_POPULATE_OPTIONS.DELIVERABLES,
                PRACTICE_TEMPLATE_POPULATE_OPTIONS.FORMATS],
        });

        return this.mapper.toPaginatedResponseDto(result);
    }

    async updateTemplate(
        id: string,
        dto: UpdatePracticeTemplateRequestDto,
    ): Promise<PracticeTemplateResponseDto> {
        const doc = await this.templateModel.findByIdAndUpdate(id, dto, { new: true })
            .populate([
                PRACTICE_TEMPLATE_POPULATE_OPTIONS.DELIVERABLES,
                PRACTICE_TEMPLATE_POPULATE_OPTIONS.FORMATS])
            .exec();
        if (!doc) throw new PracticeTemplateNotFoundException();
        return this.mapper.toResponseDto(doc);
    }

    async deleteTemplate(id: string): Promise<void> {
        const template = await this.templateModel.findById(id);
        if (!template) throw new PracticeTemplateNotFoundException();

        await template.softDelete();
    }

    async validateTemplateExists(id: string): Promise<void> {
        const exists = await this.templateModel.exists({ _id: id });
        if (!exists) throw new PracticeTemplateNotFoundException();
    }

    async getTypeahead(query: string): Promise<TypeaheadItem[]> {
        const docs = await this.templateModel
            .find({ name: { $regex: `^${query}`, $options: 'i' } })
            .limit(MAX_TYPEAHEAD_ITEMS)
            .exec();
        return docs.map(doc => ({ label: doc.name, value: doc._id.toString() }));
    }
}
