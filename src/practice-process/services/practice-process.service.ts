import { PaginatedResult } from '@common/types/paginated-result';
import { getSort } from '@common/utils/pagination.util';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { PracticeDefinitionReponseDto } from 'practice-definition/dtos/practice-defintion-response.dto';
import { PracticeDefinitionService } from 'practice-definition/practice-definition.service';
import { PRACTICE_PROCESS_POPULATE_OPTIONS, PRACTICE_PROCESS_SORT_DEFAULT_OPTION, PRACTICE_PROCESS_SORT_OPTIONS } from 'practice-process/constants/practice-process.constants';
import { CancelPracticeProcessRequestDto } from 'practice-process/dtos/cancel-practice-process.request.dto';
import { PracticeProcessDetailResponseDto } from 'practice-process/dtos/practice-process-detail-response.dto';
import { PracticeProcessFilterDto } from 'practice-process/dtos/practice-process-filter.dto';
import { PracticeProcessResponseDto } from 'practice-process/dtos/practice-process-response.dto';
import { StartPracticeProcessRequestDto } from 'practice-process/dtos/start-practice-process-request.dto';
import { PracticeProcessStatus } from 'practice-process/enums/practice-process.enums';
import { PracticeProcessNotFoundException } from 'practice-process/exceptions/practice-process-not-found.exception';
import { StudentHasAlreadyDonePracticeDefinitionException } from 'practice-process/exceptions/student-has-already-done-practice-definition.exception';
import { StudentHasAlreadyPracticeProcessException } from 'practice-process/exceptions/student-has-already-practice-process.exception';
import { StudentHasNotCompanyException } from 'practice-process/exceptions/student-has-not-company.exception';
import { PracticeProcessMapper } from 'practice-process/mappers/practice-process.mapper';
import { PracticeProcessDeliverable } from 'practice-process/schemas/practice-process-deliverable.schema';
import { PracticeProcessFollowUp } from 'practice-process/schemas/practice-process-follow-up.schema';
import { PracticeProcess, PracticeProcessDocument } from 'practice-process/schemas/practice-process.schema';
import { ProfessorService } from 'professor/professor.service';
import { StudentService } from 'student/student.service';

@Injectable()
export class PracticeProcessService {
    constructor(
        @InjectModel(PracticeProcess.name)
        private readonly practiceProcessModel: PaginateModel<PracticeProcessDocument>,
        @InjectModel(PracticeProcessDeliverable.name)
        private readonly practiceProcessDeliverableModel: PaginateModel<PracticeProcessDeliverable>,
        private readonly practiceDefinitionService: PracticeDefinitionService,
        private readonly studentService: StudentService,
        private readonly professorService: ProfessorService,
        private readonly practiceProcessMapper: PracticeProcessMapper,
    ) { }

    async startPracticeProcess(practiceProcessDto: StartPracticeProcessRequestDto): Promise<PracticeProcessResponseDto> {
        const practiceDefinition = await this.practiceDefinitionService.getPracticeDefinitionById(practiceProcessDto.practiceDefinition);
        const student = await this.studentService.getStudentById(practiceProcessDto.student);
        const professor = await this.professorService.getProfessorById(practiceProcessDto.professor);


        if (!student.currentCompany) throw new StudentHasNotCompanyException();

        await this.ensureStudentHasNoActiveProcess(student._id);
        await this.ensureHasNotAlreadyDonePracticeDefinition(student._id, practiceDefinition._id);

        const status = this.calculateInitialStatus(practiceProcessDto.startDate);

        const practiceProcess = new this.practiceProcessModel({
            ...practiceProcessDto,
            company: student.currentCompany._id,
            status,
        });
        const savedPracticeProcess = await practiceProcess.save();

        await savedPracticeProcess.populate([
            PRACTICE_PROCESS_POPULATE_OPTIONS.PRACTICE_DEFINITION,
            PRACTICE_PROCESS_POPULATE_OPTIONS.STUDENT,
            PRACTICE_PROCESS_POPULATE_OPTIONS.PROFESSOR,
            PRACTICE_PROCESS_POPULATE_OPTIONS.COMPANY
        ]);

        await this.createProcessDeliverables(practiceDefinition, savedPracticeProcess._id, practiceProcessDto.startDate);

        return this.practiceProcessMapper.toResponseDto(savedPracticeProcess);
    }

    async cancelPracticeProcess(
        processId: string,
        cancelDto: CancelPracticeProcessRequestDto
    ): Promise<PracticeProcessResponseDto> {
        const practiceProcess = await this.practiceProcessModel.findById(processId);
        if (!practiceProcess) throw new PracticeProcessNotFoundException();

        practiceProcess.status = PracticeProcessStatus.CANCELLED;
        practiceProcess.cancelledBy = cancelDto.cancelledBy;
        practiceProcess.cancellationReason = cancelDto.cancellationReason;
        practiceProcess.cancellationDate = new Date();

        const updatedPracticeProcess = await practiceProcess.save();
        await updatedPracticeProcess.populate([
            PRACTICE_PROCESS_POPULATE_OPTIONS.PRACTICE_DEFINITION,
            PRACTICE_PROCESS_POPULATE_OPTIONS.STUDENT,
            PRACTICE_PROCESS_POPULATE_OPTIONS.PROFESSOR,
            PRACTICE_PROCESS_POPULATE_OPTIONS.COMPANY
        ]);

        return this.practiceProcessMapper.toResponseDto(updatedPracticeProcess);
    }

    async getPracticeProcessesByCriteria(
        filter: PracticeProcessFilterDto
    ): Promise<PaginatedResult<PracticeProcessResponseDto>> {
        const { page, limit, sortBy, sortOrder } = filter;
        const query: any = {};

        if (filter.student) {
            query.student = new Types.ObjectId(filter.student);
        }
        if (filter.professor) {
            query.professor = new Types.ObjectId(filter.professor);
        }
        if (filter.practiceDefinition) {
            query.practiceDefinition = new Types.ObjectId(filter.practiceDefinition);
        }
        if (filter.company) {
            query.company = new Types.ObjectId(filter.company);
        }
        if (filter.status) {
            query.status = filter.status;
        }

        const options = {
            page: filter.page,
            limit: filter.limit,
            sort: getSort(
                PRACTICE_PROCESS_SORT_OPTIONS,
                PRACTICE_PROCESS_SORT_DEFAULT_OPTION,
                sortBy,
                sortOrder
            ),
            populate: [
                PRACTICE_PROCESS_POPULATE_OPTIONS.PRACTICE_DEFINITION,
                PRACTICE_PROCESS_POPULATE_OPTIONS.STUDENT,
                PRACTICE_PROCESS_POPULATE_OPTIONS.PROFESSOR,
                PRACTICE_PROCESS_POPULATE_OPTIONS.COMPANY
            ]
        };

        const paginatedProcesses = await this.practiceProcessModel.paginate(query, options);
        return this.practiceProcessMapper.toPaginatedResponseDto(paginatedProcesses);
    }

    async getPracticeProcessById(
        userId: string,
        processId: string | Types.ObjectId
    ): Promise<PracticeProcessDetailResponseDto> {
        const practiceProcess = await this.practiceProcessModel.findById(processId).populate([
            PRACTICE_PROCESS_POPULATE_OPTIONS.PRACTICE_DEFINITION,
            PRACTICE_PROCESS_POPULATE_OPTIONS.STUDENT,
            PRACTICE_PROCESS_POPULATE_OPTIONS.PROFESSOR,
            PRACTICE_PROCESS_POPULATE_OPTIONS.COMPANY,
            PRACTICE_PROCESS_POPULATE_OPTIONS.DELIVERABLES,
            PRACTICE_PROCESS_POPULATE_OPTIONS.FOLLOW_UPS
        ]);

        if (!practiceProcess) throw new PracticeProcessNotFoundException();

        if (practiceProcess.student._id.toString() !== userId && practiceProcess.professor._id.toString() !== userId) {
            throw new PracticeProcessNotFoundException();
        }

        return this.practiceProcessMapper.toDetailedResponseDto(
            practiceProcess as unknown as PracticeProcess & { deliverables: PracticeProcessDeliverable[]; followUps: PracticeProcessFollowUp[] }
        );
    }


    async getCurrentPracticeProcessForStudent(
        studentId: string | Types.ObjectId
    ): Promise<PracticeProcessResponseDto | null> {
        const currentPracticeProcess = await this.practiceProcessModel.findOne({
            student: new Types.ObjectId(studentId),
            status: PracticeProcessStatus.IN_PROGRESS
        }).populate([
            PRACTICE_PROCESS_POPULATE_OPTIONS.PRACTICE_DEFINITION,
            PRACTICE_PROCESS_POPULATE_OPTIONS.STUDENT,
            PRACTICE_PROCESS_POPULATE_OPTIONS.PROFESSOR,
            PRACTICE_PROCESS_POPULATE_OPTIONS.COMPANY
        ]);

        if (!currentPracticeProcess) return null;

        return this.practiceProcessMapper.toResponseDto(currentPracticeProcess);
    }

    async deletePracticeProcess(
        processId: string | Types.ObjectId
    ): Promise<void> {
        const practiceProcess = await this.practiceProcessModel.findById(processId);
        if (!practiceProcess) throw new PracticeProcessNotFoundException();

        practiceProcess.softDelete();
    }


    private async ensureStudentHasNoActiveProcess(studentId: string | Types.ObjectId): Promise<void> {
        const currentPracticeProcess = await this.practiceProcessModel.findOne({
            student: new Types.ObjectId(studentId),
            status: { $nin: [PracticeProcessStatus.CANCELLED, PracticeProcessStatus.COMPLETED] }
        });
        if (currentPracticeProcess) throw new StudentHasAlreadyPracticeProcessException();
    }

    private async ensureHasNotAlreadyDonePracticeDefinition(
        studentId: string | Types.ObjectId,
        practiceDefinitionId: string | Types.ObjectId
    ): Promise<void> {

        const practiceProcess = await this.practiceProcessModel.findOne({
            student: new Types.ObjectId(studentId),
            practiceDefinition: new Types.ObjectId(practiceDefinitionId),
            status: { $ne: PracticeProcessStatus.CANCELLED }
        });

        if (practiceProcess) throw new StudentHasAlreadyDonePracticeDefinitionException();
    }

    private calculateInitialStatus(startDate: Date | string): PracticeProcessStatus {
        return Date.now() < new Date(startDate).getTime()
            ? PracticeProcessStatus.PENDING
            : PracticeProcessStatus.IN_PROGRESS;
    }

    private async createProcessDeliverables(
        practiceDefinition: PracticeDefinitionReponseDto,
        processId: Types.ObjectId,
        startDate: Date | string
    ): Promise<void> {
        const deliverables = practiceDefinition.practiceTemplate.deliverables.map(deliverable => {
            const dueDate = new Date(startDate);
            dueDate.setDate(dueDate.getDate() + deliverable.estimatedDueOffsetDays);

            return new this.practiceProcessDeliverableModel({
                process: processId,
                title: deliverable.title,
                description: deliverable.description,
                templateDeliverable: deliverable._id,
                dueDate,
                status: PracticeProcessStatus.PENDING
            });
        });
        await this.practiceProcessDeliverableModel.insertMany(deliverables);
    }
}