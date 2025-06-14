import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { PracticeDefinitionReponseDto } from 'practice-definition/dtos/practice-defintion-response.dto';
import { PracticeDefinitionService } from 'practice-definition/practice-definition.service';
import { PRACTICE_PROCESS_POPULATE_OPTIONS } from 'practice-process/constants/practice-process.constants';
import { PracticeProcessResponseDto } from 'practice-process/dtos/practice-process-response.dto';
import { StartPracticeProcessRequestDto } from 'practice-process/dtos/start-practice-process-request.dto';
import { PracticeProcessStatus } from 'practice-process/enums/practice-process.enums';
import { StudentHasAlreadyPracticeProcessException } from 'practice-process/exceptions/student-has-already-practice-process.exception';
import { StudentHasNotCompanyException } from 'practice-process/exceptions/student-has-not-company.exception';
import { PracticeProcessMapper } from 'practice-process/mappers/practice-process.mapper';
import { PracticeProcessDeliverable } from 'practice-process/schemas/practice-process-deliverable.schema';
import { PracticeProcess } from 'practice-process/schemas/practice-process.schema';
import { ProfessorService } from 'professor/professor.service';
import { StudentService } from 'student/student.service';

@Injectable()
export class PracticeProcessService {
    constructor(
        @InjectModel(PracticeProcess.name)
        private readonly practiceProcessModel: PaginateModel<PracticeProcess>,
        @InjectModel(PracticeProcessDeliverable.name)
        private readonly practiceProcessDeliverableModel: PaginateModel<PracticeProcessDeliverable>,
        private readonly practiceDefinitionService: PracticeDefinitionService,
        private readonly studentService: StudentService,
        private readonly professorService: ProfessorService,
        private readonly practiceProcessMapper: PracticeProcessMapper,
    ) {}

    async startPracticeProcess(practiceProcessDto: StartPracticeProcessRequestDto): Promise<PracticeProcessResponseDto> {
        const practiceDefinition = await this.practiceDefinitionService.getPracticeDefinitionById(practiceProcessDto.practiceDefinition);
        const student = await this.studentService.getStudentById(practiceProcessDto.student);
        const professor = await this.professorService.getProfessorById(practiceProcessDto.professor);


        if (!student.currentCompany) throw new StudentHasNotCompanyException();

        await this.ensureStudentHasNoActiveProcess(student._id);

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

    private async ensureStudentHasNoActiveProcess(studentId: string | Types.ObjectId): Promise<void> {
        const currentPracticeProcess = await this.practiceProcessModel.findOne({
            student: new Types.ObjectId(studentId),
            status: { $nin: [PracticeProcessStatus.CANCELLED, PracticeProcessStatus.COMPLETED] }
        });
        if (currentPracticeProcess) throw new StudentHasAlreadyPracticeProcessException();
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
                templateDeliverable: deliverable._id,
                dueDate,
                status: PracticeProcessStatus.PENDING
            });
        });
        await this.practiceProcessDeliverableModel.insertMany(deliverables);
    }
}