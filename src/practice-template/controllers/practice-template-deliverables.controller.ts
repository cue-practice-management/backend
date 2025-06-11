import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    Query,
} from '@nestjs/common';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { PaginatedResult } from '@common/types/paginated-result';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { CreatePracticeTemplateDeliverableRequestDto } from 'practice-template/dtos/create-practice-template-deliverable-request.dto';
import { PracticeDeliverableTemplateFilterDto } from 'practice-template/dtos/practice-template-deliverable-filter.dto';
import { PracticeTemplateDeliverableResponseDto } from 'practice-template/dtos/practice-template-delliverable-response.dto';
import { UpdatePracticeTemplateDeliverableRequestDto } from 'practice-template/dtos/update-practice-template-deliverable-request.dto';
import { PracticeTemplateDeliverableService } from 'practice-template/services/practice-template-deliverable.service';

@Controller('practice-templates/:templateId/deliverables')
export class PracticeTemplateDeliverablesController {
    constructor(
        private readonly practiceTemplateDeliverableService: PracticeTemplateDeliverableService,
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN)
    async getByCriteria(
        @Param('templateId', ParseObjectIdPipe) templateId: string,
        @Query() filter: PracticeDeliverableTemplateFilterDto,
    ): Promise<PaginatedResult<PracticeTemplateDeliverableResponseDto>> {
        filter.template = templateId;
        return this.practiceTemplateDeliverableService.getPracticeTemplateDeliverablesByCriteria(filter);
    }

    @Post('create')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    create(
        @Param('templateId', ParseObjectIdPipe) templateId: string,
        @Body() dto: CreatePracticeTemplateDeliverableRequestDto,
    ): Promise<PracticeTemplateDeliverableResponseDto> {
        dto.template = templateId;
        return this.practiceTemplateDeliverableService.createPracticeTemplateDeliverable(dto);
    }

    @Put('update/:id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    update(
        @Param('templateId', ParseObjectIdPipe) templateId: string,
        @Param('id', ParseObjectIdPipe) id: string,
        @Body() dto: UpdatePracticeTemplateDeliverableRequestDto,
    ): Promise<PracticeTemplateDeliverableResponseDto> {
        return this.practiceTemplateDeliverableService.updatePracticeTemplateDeliverable(id, dto);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    delete(
        @Param('templateId', ParseObjectIdPipe) templateId: string,
        @Param('id', ParseObjectIdPipe) id: string,
    ): Promise<void> {
        return this.practiceTemplateDeliverableService.deletePracticeTemplateDeliverable(id);
    }
}
