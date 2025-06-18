import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { GradePracticeProcessDeliverableRequestDto } from 'practice-process/dtos/grade-practice-process-deliverable-request.dto';
import { PracticeProcessDeliverableService } from 'practice-process/services/practice-process-deliverable.service';

@Controller('practice-processes/:practiceProcessId/deliverables')
export class PracticeProcessDeliverableController {

    constructor(
        private readonly practiceProcessService: PracticeProcessDeliverableService,
    ) { }

    @Post(':deliverableId/submit')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.STUDENT)
    @UseInterceptors(FileInterceptor('file'))
    async submitDeliverable(
        @Param('practiceProcessId', ParseObjectIdPipe) practiceProcessId: string,
        @Param('deliverableId', ParseObjectIdPipe) deliverableId: string,
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() userId: string,
    ) {
        return this.practiceProcessService.submitDeliverable(practiceProcessId, deliverableId, userId, file);
    }

    @Post(':deliverableId/grade')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.PROFESSOR)
    async gradeDeliverable(
        @Param('practiceProcessId', ParseObjectIdPipe) practiceProcessId: string,
        @Param('deliverableId', ParseObjectIdPipe) deliverableId: string,
        @CurrentUser() userId: string,
        @Body() gradePracticeProcessDeliverableRequestDto : GradePracticeProcessDeliverableRequestDto,
    ) {
        return this.practiceProcessService.gradeDeliverable(practiceProcessId, deliverableId, userId, gradePracticeProcessDeliverableRequestDto);
    }



}
