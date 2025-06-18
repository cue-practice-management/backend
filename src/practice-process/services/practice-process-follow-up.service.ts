import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { CancelPracticeProcessFollowUpRequestDto } from 'practice-process/dtos/cancel-practice-process-follo-up-request.dto';
import { CompletePracticeProcessFollowUpRequestDto } from 'practice-process/dtos/complete-practice-process-follo-up-request.dto';
import { PracticeProcessFollowUpResponseDto } from 'practice-process/dtos/practice-process-follow-up-response.dto';
import { ProfessorHasAlreadyFollowUpOnDateException } from 'practice-process/dtos/professor-has-already-follow-up-on-date.exception';
import { SchedulePracticeProcessFollowUpRequestDto } from 'practice-process/dtos/schedule-practice-process-follow-up-request.dto';
import { FollowUpStatus } from 'practice-process/enums/practice-process-follow-up.enum';
import { PracticeProcessStatus } from 'practice-process/enums/practice-process.enums';
import { PracticeProcessFollowUpInvalidDateToCompleteException } from 'practice-process/exceptions/practice-process-follow-up-invalid-date-to-complete.exception';
import { PracticeProcessFollowUpInvalidStatusToCancelException } from 'practice-process/exceptions/practice-process-follow-up-invalid-status-to-cancel.exception';
import { PracticeProcessFollowUpInvalidStatusToCompleteException } from 'practice-process/exceptions/practice-process-follow-up-invalid-status-to-complete.exception';
import { PracticeProcessFollowUpInvalidStatusToScheduleException } from 'practice-process/exceptions/practice-process-follow-up-invalid-status-to-schedule.exception';
import { PracticeProcessFollowUpNotAuthorizedForScheduleException } from 'practice-process/exceptions/practice-process-follow-up-not-authorized-for-schedule.exception';
import { PracticeProcessNotFoundException } from 'practice-process/exceptions/practice-process-not-found.exception';
import { PracticeProcessFollowUpMapper } from 'practice-process/mappers/practice-process-follow-up.mapper';
import { PracticeProcessFollowUp, PracticeProcessFollowUpDocument } from 'practice-process/schemas/practice-process-follow-up.schema';
import { PracticeProcess, PracticeProcessDocument } from 'practice-process/schemas/practice-process.schema';

@Injectable()
export class PracticeProcessFollowUpService {

    constructor(
        @InjectModel(PracticeProcessFollowUp.name)
        private readonly practiceProcessFollowUpModel: PaginateModel<PracticeProcessFollowUpDocument>,
        @InjectModel(PracticeProcess.name)
        private readonly practiceProcessModel: PaginateModel<PracticeProcessDocument>,
        private readonly practiceProcessFollowUpMapper: PracticeProcessFollowUpMapper
    ) { }


    async scheduleFollowUp(
        practiceProcessId: string,
        userId: string,
        scheduleFollowUpRequestDto: SchedulePracticeProcessFollowUpRequestDto
    ): Promise<PracticeProcessFollowUpResponseDto> {
        const practiceProcess = await this.validatePracticeProcessExists(practiceProcessId);

        await this.validateUserIsProfessorOfPracticeProcess(practiceProcess, userId);

        this.validatePracticeProcessStatusToSchedule(practiceProcess);

        await this.validateProfessorHasNotFollowUpOnDate(scheduleFollowUpRequestDto.date, userId);

        const practiceProcessFollowUp = new this.practiceProcessFollowUpModel({
            ...scheduleFollowUpRequestDto,
            process: practiceProcessId,
            status: FollowUpStatus.SCHEDULED
        })

        await practiceProcessFollowUp.save();

        return this.practiceProcessFollowUpMapper.toResponseDto(practiceProcessFollowUp);
    }

    async cancelFollowUp(
        practiceProcessId: string,
        followUpId: string,
        userId: string,
        cancelPracticeProcessFollowUpRequestDto: CancelPracticeProcessFollowUpRequestDto
    ): Promise<PracticeProcessFollowUpResponseDto> {
        const practiceProcess = await this.validatePracticeProcessExists(practiceProcessId);
        await this.validateUserIsProfessorOfPracticeProcess(practiceProcess, userId);

        const followUp = await this.validatePracticeProcessFollowUpExists(practiceProcessId, followUpId);
        this.validatePracticeProcessFollowUpStatusToCancel(followUp);

        followUp.status = FollowUpStatus.CANCELLED;
        followUp.cancellationReason = cancelPracticeProcessFollowUpRequestDto.cancellationReason;
        followUp.cancelledAt = new Date();

        await followUp.save();

        return this.practiceProcessFollowUpMapper.toResponseDto(followUp);
    }

    async completeFollowUp(
        practiceProcessId: string,
        followUpId: string,
        userId: string,
        completeFollowUpRequestDto: CompletePracticeProcessFollowUpRequestDto
    ): Promise<PracticeProcessFollowUpResponseDto> {
        const practiceProcess = await this.validatePracticeProcessExists(practiceProcessId);
        await this.validateUserIsProfessorOfPracticeProcess(practiceProcess, userId);

        const followUp = await this.validatePracticeProcessFollowUpExists(practiceProcessId, followUpId);

        this.validatePracticeProcessFollowUpStatusToComplete(followUp);
        this.validatePracticeProcessFollowUpDateToComplete(followUp);
        
        followUp.status = FollowUpStatus.COMPLETED;
        followUp.outcomeNotes = completeFollowUpRequestDto.outcomeNotes;
        followUp.completedAt = new Date();

        await followUp.save();

        return this.practiceProcessFollowUpMapper.toResponseDto(followUp);
    }

    private async validatePracticeProcessExists(practiceProcessId: string): Promise<PracticeProcess> {
        const practiceProcess = await this.practiceProcessModel.findById(practiceProcessId);

        if (!practiceProcess) {
            throw new PracticeProcessNotFoundException();
        }

        return practiceProcess;
    }

    private validatePracticeProcessStatusToSchedule(practiceProcess: PracticeProcess): void {
        if (practiceProcess.status !== PracticeProcessStatus.IN_PROGRESS) {
            throw new PracticeProcessFollowUpInvalidStatusToScheduleException();
        }
    }

    private validatePracticeProcessFollowUpDateToComplete(followUp: PracticeProcessFollowUp): void {
        if (new Date() < new Date(followUp.date)) {
            throw new PracticeProcessFollowUpInvalidDateToCompleteException();
        }
    }

    private validatePracticeProcessFollowUpStatusToComplete(followUp: PracticeProcessFollowUp): void {
        if (followUp.status !== FollowUpStatus.SCHEDULED) {
            throw new PracticeProcessFollowUpInvalidStatusToCompleteException();
        }
    }

    private validatePracticeProcessFollowUpStatusToCancel(followUp: PracticeProcessFollowUp): void {
        if (followUp.status !== FollowUpStatus.SCHEDULED) {
            throw new PracticeProcessFollowUpInvalidStatusToCancelException();
        }
    }

    private async validatePracticeProcessFollowUpExists(practiceProcessId: string, followUpId: string): Promise<PracticeProcessFollowUpDocument> {
        const followUp = await this.practiceProcessFollowUpModel.findOne({
            _id: followUpId,
            process: practiceProcessId,
        });

        if (!followUp) throw new PracticeProcessNotFoundException();

        return followUp;
    }

    private async validateUserIsProfessorOfPracticeProcess(
        practiceProcess: PracticeProcess,
        userId: string
    ): Promise<void> {

        if (practiceProcess.professor.toString() !== userId) {
            throw new PracticeProcessFollowUpNotAuthorizedForScheduleException();
        }

    }

    private async validateProfessorHasNotFollowUpOnDate(
        date: Date,
        professorId: string
    ): Promise<void> {
        const activeProcessIds = await this.getActivePracticeProcessIdsForProfessor(professorId);
        const start = new Date(date);
        start.setMinutes(0, 0, 0);
        const end = new Date(start);
        end.setMinutes(59, 59, 999);


        const existing = await this.practiceProcessFollowUpModel.findOne({
            process: { $in: activeProcessIds.map(id => new Types.ObjectId(id)) },
            date: { $gte: start, $lte: end },
            status: FollowUpStatus.SCHEDULED,
        });

        if (existing) throw new ProfessorHasAlreadyFollowUpOnDateException();

    }

    private async getActivePracticeProcessIdsForProfessor(professorId: string): Promise<string[]> {
        const processes = await this.practiceProcessModel.find({
            professor: professorId,
            status: PracticeProcessStatus.IN_PROGRESS,
        }).select('_id');

        return processes.map(p => p._id.toString());
    }


}
