import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
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
}
