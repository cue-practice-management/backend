import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StudentCompanyLinkingProcess, StudentCompanyLinkingProcessDocument } from './schemas/student-company-linking-process.schema';
import { PaginateModel } from 'mongoose';
import { CreateStudentCompanyLinkingProcessRequestDto } from './dtos/create-student-company-linking-process-request.dto';
import { StudentCompanyLinkingProcessResponseDto } from './dtos/student-company-linking-process-response.dto';
import { StudentCompanyLinkingProcessMapper } from './mappers/student-company-linking-process.mapper';
import { STUDENT_COMPANY_LINKING_PROCESS_DEFAULT_SORT, STUDENT_COMPANY_LINKING_PROCESS_POPULATE_OPTIONS, STUDENT_COMPANY_LINKING_PROCESS_SORT_OPTIONS } from './constants/student-company-linking-process.constants';
import { StudentCompanyLinkingProcessFilterDto } from './dtos/student-company-linking-process-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { getSort } from '@common/utils/pagination.util';
import { UpdateStudentCompanyLinkingProcessStatusRequestDto } from './dtos/update-student-company-linking-process-status-request.dto';
import { StudentCompanyLinkingProcessNotFoundException } from './exceptions/student-company-linking-process-not-found.exception';
import { StudentCompanyLinkingProcessStatus } from './enums/student-company-linking-process-status.enum';
import { StudentCompanyLinkingProcessApprovedStatusChangedException } from './exceptions/student-company-linking-process-approved-status-changed.exception';
import { CompanyService } from 'company/company.service';
import { StudentService } from 'student/student.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { STUDENT_COMPANY_LINKING_PROCESS_EVENT } from './constants/student-company-linking-process-event.constants';

@Injectable()
export class StudentCompanyLinkingProcessService {
    constructor(
        @InjectModel(StudentCompanyLinkingProcess.name)
        private readonly studentCompanyLinkingProcessModel: PaginateModel<StudentCompanyLinkingProcessDocument>,
        private readonly studentCompanyLinkingProcessMapper: StudentCompanyLinkingProcessMapper,
        private readonly companyService: CompanyService,
        private readonly studentService: StudentService,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async createStudentCompanyLinkingProcess(
        studentCompanyLinkingProcess: CreateStudentCompanyLinkingProcessRequestDto,
    ): Promise<StudentCompanyLinkingProcessResponseDto> {
        await this.validateRelatedEntitiesExist(studentCompanyLinkingProcess.student, studentCompanyLinkingProcess.company);

        const newProcess = new this.studentCompanyLinkingProcessModel(studentCompanyLinkingProcess);
        await newProcess.save();
        await newProcess.populate([
            STUDENT_COMPANY_LINKING_PROCESS_POPULATE_OPTIONS.STUDENT,
            STUDENT_COMPANY_LINKING_PROCESS_POPULATE_OPTIONS.COMPANY
        ]);

        const studentCompanyLinkingProcessResponse = this.studentCompanyLinkingProcessMapper.toResponseDto(newProcess);

        this.eventEmitter.emit(
            STUDENT_COMPANY_LINKING_PROCESS_EVENT.STUDENT_COMPANY_LINKING_PROCESS_CREATED,
            { studentCompanyLinkingProcess: studentCompanyLinkingProcessResponse }
        );
        return studentCompanyLinkingProcessResponse;
    }

    async getStudentCompanyLinkingProcessByCriteria(
        filter: StudentCompanyLinkingProcessFilterDto
    ): Promise<PaginatedResult<StudentCompanyLinkingProcessResponseDto>> {
        const { page, limit, sortBy, sortOrder } = filter
        const query = this.buildFilterQuery(filter);

        const options = {
            page,
            limit,
            sort: getSort(
                STUDENT_COMPANY_LINKING_PROCESS_SORT_OPTIONS,
                STUDENT_COMPANY_LINKING_PROCESS_DEFAULT_SORT,
                sortBy,
                sortOrder
            ),
            populate: [
                STUDENT_COMPANY_LINKING_PROCESS_POPULATE_OPTIONS.STUDENT,
                STUDENT_COMPANY_LINKING_PROCESS_POPULATE_OPTIONS.COMPANY
            ]
        };

        const result = await this.studentCompanyLinkingProcessModel.paginate(query, options);

        return this.studentCompanyLinkingProcessMapper.toPaginatedResponseDto(result);
    }

    async updateStudentCompanyLinkingProcessStatus(
        processId: string,
        studentCompanyLinkingProcessUpdate: UpdateStudentCompanyLinkingProcessStatusRequestDto,
    ) {
        const process = await this.studentCompanyLinkingProcessModel.findById(processId);
        if (!process) {
            throw new StudentCompanyLinkingProcessNotFoundException();
        }

        if (process.status === StudentCompanyLinkingProcessStatus.ACCEPTED) {
            throw new StudentCompanyLinkingProcessApprovedStatusChangedException();
        }

        process.status = studentCompanyLinkingProcessUpdate.status;
        process.observations = studentCompanyLinkingProcessUpdate.observations;

        await process.save();
        await process.populate([
            STUDENT_COMPANY_LINKING_PROCESS_POPULATE_OPTIONS.STUDENT,
            STUDENT_COMPANY_LINKING_PROCESS_POPULATE_OPTIONS.COMPANY
        ]);

        const studentCompanyLinkingProcessResponse = this.studentCompanyLinkingProcessMapper.toResponseDto(process);

        this.eventEmitter.emit(
            STUDENT_COMPANY_LINKING_PROCESS_EVENT.STUDENT_COMPANY_LINKING_PROCESS_ACCEPTED,
            { studentCompanyLinkingProcess: studentCompanyLinkingProcessResponse  }
        );
        
        return studentCompanyLinkingProcessResponse;
    }

    async deleteStudentCompanyLinkingProcess(
        processId: string
    ): Promise<void> {
        const process = await this.studentCompanyLinkingProcessModel.findById(processId);
        if (!process) {
            throw new StudentCompanyLinkingProcessNotFoundException();
        }

        await process.softDelete();
    }

    private async validateRelatedEntitiesExist(studentId: string, companyId: string): Promise<void> {
        await this.studentService.validateStudentExists(studentId);
        await this.companyService.validateCompanyExists(companyId);
    }


    private buildFilterQuery(
        filter: StudentCompanyLinkingProcessFilterDto
    ): Record<string, any> {
        const query: Record<string, any> = {};

        if (filter.student) {
            query.student = filter.student;
        }

        if (filter.company) {
            query.company = filter.company;
        }

        if (filter.status) {
            query.status = filter.status;
        }

        return query;
    }
}
