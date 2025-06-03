import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StudentCompanyContract, StudentCompanyContractDocument } from './schemas/student-company-contract.schema';
import { PaginateModel } from 'mongoose';
import { CreateStudentCompanyContractFromLinkingProcessDto } from './dtos/create-student-company-contract-from-linking-process.dto';
import { StudentCompanyContractResponseDto } from './dtos/student-company-contract-response.dto';
import { StudentCompanyContractMapper } from './mappers/student-company-contract.mapper';
import { StudentCompanyContractStatus } from './enums/student-company-contract-status.enum';
import { StudentHasAlreadyActiveContractException } from './exceptions/student-has-already-active-contract.exception';

@Injectable()
export class StudentCompanyContractService {
    constructor(
        @InjectModel(StudentCompanyContract.name)
        private readonly studentCompanyContractModel: PaginateModel<StudentCompanyContractDocument>,
        private readonly studentCompanyContractMapper: StudentCompanyContractMapper,
    ) { }

    async createStudentCompanyContractFromLinkingProcess(dto: CreateStudentCompanyContractFromLinkingProcessDto): Promise<StudentCompanyContractResponseDto> {
        this.validateStudentHasActiveContract(dto.student);

        const studentCompanyContract = new this.studentCompanyContractModel(dto);
        const savedContract = await studentCompanyContract.save();

        return this.studentCompanyContractMapper.toStudentCompanyContractResponseDto(savedContract);
    }

    private async validateStudentHasActiveContract(studentId: string): Promise<void> {
        const activeContract = await this.studentCompanyContractModel.findOne({
            student: studentId,
            status: { $in: [StudentCompanyContractStatus.ACTIVE, StudentCompanyContractStatus.PENDING_SIGNATURE] },
        });

        if (activeContract) {
            throw new StudentHasAlreadyActiveContractException();
        }
    }
}
