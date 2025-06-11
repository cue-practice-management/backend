import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PracticeTemplateFormatMapper } from 'practice-template/mappers/practice-template-format.mapper';
import { PracticeTemplateFormat, PracticeTemplateFormatDocument } from 'practice-template/schemas/practice-template-format.schema';
import { PracticeTemplateService } from './practice-template.service';
import { FileService } from 'file/file.service';
import { PracticeTemplateFormatResponseDto } from 'practice-template/dtos/practice-template-format-response.dto';
import { CreatePracticeTemplateFormatRequestDto } from 'practice-template/dtos/create-practice-template-format-request.dto';
import { FILE_FOLDERS } from 'file/constants/file.constants';
import { PracticeTemplateFormatFilterDto } from 'practice-template/dtos/practice-template-format-filter.dto';
import { getSort } from '@common/utils/pagination.util';
import { DEFAULT_PRACTICE_TEMPLATE_FORMAT_SORT_OPTION, PRACTICE_TEMPLATE_FORMAT_SORT_OPTIONS } from 'practice-template/constants/practice-template-format.constants';
import { UpdatePracticeTemplateFormatRequestDto } from 'practice-template/dtos/update-practice-template-format-request.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { PracticeTemplateFormatNotFoundException } from 'practice-template/exceptions/practice-template-format-not-found.exception';
import { PracticeTemplateFormatFileMissingException } from 'practice-template/exceptions/practice-template-format-file-missing.exception';

@Injectable()
export class PracticeTemplateFormatService {
    constructor(
        @InjectModel(PracticeTemplateFormat.name)
        private readonly practiceTemplateFormatModel: PaginateModel<PracticeTemplateFormatDocument>,
        private readonly practiceTemplateFormatMapper: PracticeTemplateFormatMapper,
        private readonly practiceTemplateService: PracticeTemplateService,
        private readonly fileService: FileService,
    ) { }

    async createPracticeTemplateFormat(
        dto: CreatePracticeTemplateFormatRequestDto,
        file: Express.Multer.File,
    ): Promise<PracticeTemplateFormatResponseDto> {

        if (!file) throw new PracticeTemplateFormatFileMissingException();
    
        await this.practiceTemplateService.validateTemplateExists(dto.template);

        const { fileUrl } = await this.fileService.uploadFile({
            file,
            isPublic: true,
            folder: FILE_FOLDERS.PRACTICE_TEMPLATE_FORMATS,
        });

        const doc = new this.practiceTemplateFormatModel({
            ...dto,
            fileUrl,
        });
        const saved = await doc.save();

        return this.practiceTemplateFormatMapper.toResponseDto(saved);
    }

    async getPracticeTemplateFormatsByCriteria(
        filter: PracticeTemplateFormatFilterDto,
    ): Promise<PaginatedResult<PracticeTemplateFormatResponseDto>> {
        const { page, limit, sortBy, sortOrder, template, name } = filter;

        const query: any = { template };
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        const sort = getSort(
            PRACTICE_TEMPLATE_FORMAT_SORT_OPTIONS,
            DEFAULT_PRACTICE_TEMPLATE_FORMAT_SORT_OPTION,
            sortBy,
            sortOrder,
        );

        const result = await this.practiceTemplateFormatModel.paginate(query, {
            page,
            limit,
            sort,
        });

        return this.practiceTemplateFormatMapper.toPaginatedResponseDto(result);
    }

    async updatePracticeTemplateFormat(
        id: string,
        dto: UpdatePracticeTemplateFormatRequestDto,
        file?: Express.Multer.File,
    ): Promise<PracticeTemplateFormatResponseDto> {
        const doc = await this.practiceTemplateFormatModel.findById(id);
        if (!doc) throw new PracticeTemplateFormatNotFoundException();

        if (file) {
            await this.fileService.deleteFile(doc.fileUrl, false);
            const { fileUrl } = await this.fileService.uploadFile({
                file,
                isPublic: true,
                folder: FILE_FOLDERS.PRACTICE_TEMPLATE_FORMATS,
            });
            doc.fileUrl = fileUrl;
        }

        Object.assign(doc, dto);
        const saved = await doc.save();
        return this.practiceTemplateFormatMapper.toResponseDto(saved);
    }

    async deletePracticeTemplateFormat(id: string): Promise<void> {
        const doc = await this.practiceTemplateFormatModel.findById(id);
        if (!doc) throw new PracticeTemplateFormatNotFoundException();

        await this.fileService.deleteFile(doc.fileUrl, false);
        await doc.deleteOne();
    }


    async validateExists(id: string): Promise<void> {
        const exists = await this.practiceTemplateFormatModel.exists({ _id: id });
        if (!exists) throw new PracticeTemplateFormatNotFoundException();
    }
}