import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PracticeDefinitionService } from './practice-definition.service';
import { RoleGuard } from '@auth/guards/role.guard';
import { AuthGuard } from '@auth/guards/auth.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { CreatePracticeDefinitionRequestDto } from './dtos/create-practice-defintion-request.dto';
import { PracticeDefinitionReponseDto } from './dtos/practice-defintion-response.dto';

@Controller('practice-definitions')
export class PracticeDefinitionController {
    constructor(
        private readonly practiceDefinitionService: PracticeDefinitionService,
    ) { }

    @Post('create')
    @UseGuards(RoleGuard, AuthGuard)
    @Roles(UserRole.ADMIN)
    async createPracticeDefinition(
        @Body() dto: CreatePracticeDefinitionRequestDto
    ): Promise<PracticeDefinitionReponseDto> {
        return this.practiceDefinitionService.createPracticeDefinition(dto);
    }
}
