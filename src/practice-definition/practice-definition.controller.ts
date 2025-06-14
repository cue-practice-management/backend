import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PracticeDefinitionService } from './practice-definition.service';
import { RoleGuard } from '@auth/guards/role.guard';
import { AuthGuard } from '@auth/guards/auth.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { CreatePracticeDefinitionRequestDto } from './dtos/create-practice-defintion-request.dto';
import { PracticeDefinitionReponseDto } from './dtos/practice-defintion-response.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { PracticeDefinitionFilterDto } from './dtos/practice-definition-filter.dto';
import { UpdatePracticeDefinitionRequestDto } from './dtos/update-practice-definition-request.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';

@Controller('practice-definitions')
export class PracticeDefinitionController {
    constructor(
        private readonly practiceDefinitionService: PracticeDefinitionService,
    ) { }

    @Post('create')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async createPracticeDefinition(
        @Body() dto: CreatePracticeDefinitionRequestDto
    ): Promise<PracticeDefinitionReponseDto> {
        return this.practiceDefinitionService.createPracticeDefinition(dto);
    }

    @Get()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async getPracticeDefinitions(
        @Query() filter: PracticeDefinitionFilterDto
    ): Promise<PaginatedResult<PracticeDefinitionReponseDto>> {
        return this.practiceDefinitionService.getPracticeDefinitionsByCriteria(filter);
    }

    @Get('/typeahead')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async getPracticeDefinitionsTypeahead(
        @Query('query') query: string
    ): Promise<TypeaheadItem[]> {
        return this.practiceDefinitionService.getPracticeDefinitionsTypeahead(query);
    }

    @Put('update/:practiceDefinitionId')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async updatePracticeDefinition(
        @Param('practiceDefinitionId', ParseObjectIdPipe) id: string,
        @Body() dto: UpdatePracticeDefinitionRequestDto,
    ): Promise<PracticeDefinitionReponseDto> {
        return this.practiceDefinitionService.updatePracticeDefinition(id, dto);
    }

    @Delete('delete/:practiceDefinitionId')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async deletePracticeDefinition(
        @Param('practiceDefinitionId', ParseObjectIdPipe) id: string
    ): Promise<void> {
        return this.practiceDefinitionService.deletePracticeDefinition(id);
    }
}
