import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StartPracticeProcessRequestDto } from 'practice-process/dtos/start-practice-process-request.dto';
import { PracticeProcessService } from 'practice-process/services/practice-process.service';

@Controller('practice-processes')
export class PracticeProcessController {

    constructor(
        private readonly practiceProcessService: PracticeProcessService,
    ) { }

    @Post('start')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async startPracticeProcess(
        @Body() startPracticeProcessRequestDto: StartPracticeProcessRequestDto
    ) {
        return this.practiceProcessService.startPracticeProcess(startPracticeProcessRequestDto);
    }
}
