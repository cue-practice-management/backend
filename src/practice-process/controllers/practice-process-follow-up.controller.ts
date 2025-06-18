import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { CancelPracticeProcessFollowUpRequestDto } from 'practice-process/dtos/cancel-practice-process-follo-up-request.dto';
import { CompletePracticeProcessFollowUpRequestDto } from 'practice-process/dtos/complete-practice-process-follo-up-request.dto';
import { PracticeProcessFollowUpResponseDto } from 'practice-process/dtos/practice-process-follow-up-response.dto';
import { SchedulePracticeProcessFollowUpRequestDto } from 'practice-process/dtos/schedule-practice-process-follow-up-request.dto';
import { PracticeProcessFollowUpService } from 'practice-process/services/practice-process-follow-up.service';

@Controller('practice-processes/:practiceProcessId/follow-ups')
export class PracticeProcessFollowUpController {

    constructor(
        private readonly practiceProcessFollowUpService: PracticeProcessFollowUpService,
    ) { }

    @Post('schedule')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.PROFESSOR)
    async scheduleFollowUp(
        @Param('practiceProcessId', ParseObjectIdPipe) practiceProcessId: string,
        @CurrentUser() userId: string,
        @Body() scheduleFollowUpRequestDto: SchedulePracticeProcessFollowUpRequestDto
    ): Promise<PracticeProcessFollowUpResponseDto> {
        return this.practiceProcessFollowUpService.scheduleFollowUp(practiceProcessId, userId, scheduleFollowUpRequestDto);
    }

    @Post(':followUpId/cancel')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.PROFESSOR)
    async cancelFollowUp(
        @Param('practiceProcessId', ParseObjectIdPipe) practiceProcessId: string,
        @Param('followUpId', ParseObjectIdPipe) followUpId: string,
        @CurrentUser() userId: string,
        @Body() cancelPracticeProcessFollowUpRequestDto: CancelPracticeProcessFollowUpRequestDto
    ): Promise<PracticeProcessFollowUpResponseDto> {
        return this.practiceProcessFollowUpService.cancelFollowUp(practiceProcessId, followUpId, userId, cancelPracticeProcessFollowUpRequestDto);
    }


    @Post(':followUpId/complete')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.PROFESSOR)
    async completeFollowUp(
        @Param('practiceProcessId', ParseObjectIdPipe) practiceProcessId: string,
        @Param('followUpId', ParseObjectIdPipe) followUpId: string,
        @CurrentUser() userId: string,
        @Body() completePracticeProcessFollowUpRequestDto: CompletePracticeProcessFollowUpRequestDto
    ): Promise<PracticeProcessFollowUpResponseDto> {
        return this.practiceProcessFollowUpService.completeFollowUp(practiceProcessId, followUpId, userId, completePracticeProcessFollowUpRequestDto);
    }


}
