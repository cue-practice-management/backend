import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { CancelPracticeProcessRequestDto } from 'practice-process/dtos/cancel-practice-process.request.dto';
import { PracticeProcessFilterDto } from 'practice-process/dtos/practice-process-filter.dto';
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

    @Post(':processId/cancel')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async cancelPracticeProcess(
        @Param('processId', ParseObjectIdPipe) processId: string,
        @Body() cancelPracticeProcessRequestDto: CancelPracticeProcessRequestDto
    ) {
        return this.practiceProcessService.cancelPracticeProcess(processId, cancelPracticeProcessRequestDto);
    }


    @Get()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async getPracticeProcessesByCriteria(
        @Query() filter: PracticeProcessFilterDto
    ) {
        return this.practiceProcessService.getPracticeProcessesByCriteria(filter);
    }

    @Get(':processId')
    @UseGuards(AuthGuard)
    async getPracticeProcessById(
        @CurrentUser() userId: string,
        @Param('processId', ParseObjectIdPipe) processId: string
    ) {
        return this.practiceProcessService.getPracticeProcessById(userId, processId);
    }

    @Get('student/me/current')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.STUDENT)
    async getCurrentPracticeProcessForStudent(
        @CurrentUser() studentId: string
    ) {
        return this.practiceProcessService.getCurrentPracticeProcessForStudent(studentId);
    }

    @Get('professor/me/current')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.PROFESSOR)
    async getCurrentPracticeProcessForProfessor(
        @CurrentUser() professorId: string
    ) {
        return this.practiceProcessService.getCurrentPracticeProcessesForProfessor(professorId);
    }


    @Delete('delete/:processId')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async deletePracticeProcess(
        @Param('processId', ParseObjectIdPipe) processId: string
    ) {
        return this.practiceProcessService.deletePracticeProcess(processId);
    }
}
