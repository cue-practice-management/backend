import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  StudentCompanyContract,
  StudentCompanyContractDocument,
} from './schemas/student-company-contract.schema';
import { PaginateModel } from 'mongoose';
import { CreateStudentCompanyContractFromLinkingProcessDto } from './dtos/create-student-company-contract-from-linking-process.dto';
import { StudentCompanyContractResponseDto } from './dtos/student-company-contract-response.dto';
import { StudentCompanyContractMapper } from './mappers/student-company-contract.mapper';
import { StudentCompanyContractStatus } from './enums/student-company-contract-status.enum';
import { StudentHasAlreadyActiveContractException } from './exceptions/student-has-already-active-contract.exception';
import { CreateStudentCompanyContractRequestDto } from './dtos/create-student-company-contract-request.dto';
import { FileService } from 'file/file.service';
import { StudentCompanyContractMissingException } from './exceptions/student-company-contract-missing.exception';
import { FILE_FOLDERS } from 'file/constants/file.constants';
import { StudentCompanyContractFilter } from './dtos/student-company-contract-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { getSort } from '@common/utils/pagination.util';
import {
  STUDENT_COMPANY_CONTRACT_DEFAULT_SORT,
  STUDENT_COMPANY_CONTRACT_EVENTS,
  STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS,
  STUDENT_COMPANY_CONTRACT_SORT_OPTIONS,
} from './constants/student-company-contract.constants';
import { StudentCompanyContractNotFoundException } from './exceptions/student-company-contract-not-found.excepion';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StudentService } from 'student/student.service';
import { CompanyService } from 'company/company.service';
import { StudentCompanyContractAlreadyCancelledException } from './exceptions/student-company-contract-already-cancelled.exception';
import { ActivateStudentCompanyContractRequestDto } from './dtos/activate-student-company-contract-request.dto';
import { CancelStudentCompanyContractRequestDto } from './dtos/cancel-student-company-contract-request.dto';
import { StudentCompanyContractCanNotBeActivatedException } from './exceptions/student-company-contract-can-not-be-activated.exception';

@Injectable()
export class StudentCompanyContractService {
  constructor(
    @InjectModel(StudentCompanyContract.name)
    private readonly contractModel: PaginateModel<StudentCompanyContractDocument>,
    private readonly contractMapper: StudentCompanyContractMapper,
    private readonly studentService: StudentService,
    private readonly companyService: CompanyService,
    private readonly fileService: FileService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createStudentCompanyContract(
    dto: CreateStudentCompanyContractRequestDto,
    contractFile?: Express.Multer.File,
  ): Promise<StudentCompanyContractResponseDto> {
    await this.validateContractCreation(dto, contractFile);

    const contract = new this.contractModel(dto);

    if (contractFile) {
      contract.contractUrl = await this.uploadContractFile(contractFile);
    }

    const saved = await contract.save();
    await saved.populate([
      STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.STUDENT,
      STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.COMPANY,
    ]);

    const responseDto =
      await this.contractMapper.toStudentCompanyContractResponseDto(saved);

    this.emitIfActivated(responseDto);
    return responseDto;
  }

  async createStudentCompanyContractFromLinkingProcess(
    dto: CreateStudentCompanyContractFromLinkingProcessDto,
  ): Promise<StudentCompanyContractResponseDto> {
    await this.validateStudentHasNoActiveOrPendingContract(dto.student);

    const contract = new this.contractModel(dto);
    const saved = await contract.save();
    await saved.populate([
      STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.STUDENT,
      STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.COMPANY,
    ]);

    return await this.contractMapper.toStudentCompanyContractResponseDto(saved);
  }

  async getStudentCompanyContractsByCriteria(
    filter: StudentCompanyContractFilter,
  ): Promise<PaginatedResult<StudentCompanyContractResponseDto>> {
    const { limit, page, sortBy, sortOrder } = filter;
    const query = this.buildFilterQuery(filter);

    const contracts = await this.contractModel.paginate(query, {
      limit,
      page,
      sort: getSort(
        STUDENT_COMPANY_CONTRACT_SORT_OPTIONS,
        STUDENT_COMPANY_CONTRACT_DEFAULT_SORT,
        sortBy,
        sortOrder,
      ),
      populate: [
        STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.STUDENT,
        STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.COMPANY,
      ],
    });

    return await this.contractMapper.toStudentCompanyContractsPaginatedResponseDto(
      contracts,
    );
  }

  async activateStudentCompanyContract(
    contractId: string,
    dto: ActivateStudentCompanyContractRequestDto,
    file?: Express.Multer.File,
  ): Promise<StudentCompanyContractResponseDto> {
    const contract = await this.getContractOrThrow(contractId);

    await this.validateStudentHasNoActiveContract(contract.student.toString());

    if (contract.status !== StudentCompanyContractStatus.PENDING_SIGNATURE) {
      throw new StudentCompanyContractCanNotBeActivatedException();
    }

    if (!file) {
      throw new StudentCompanyContractMissingException();
    }

    contract.status = StudentCompanyContractStatus.ACTIVE;
    contract.startDate = dto.startDate;
    contract.endDate = dto.endDate;

    if (file) {
      contract.contractUrl = await this.uploadContractFile(file);
    }

    const updatedContract = await contract.save();
    await updatedContract.populate([
      STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.STUDENT,
      STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.COMPANY,
    ]);

    const responseDto =
      await this.contractMapper.toStudentCompanyContractResponseDto(
        updatedContract,
      );
    this.emitIfActivated(responseDto);

    return responseDto;
  }

  async cancelStudentCompanyContract(
    contractId: string,
    dto: CancelStudentCompanyContractRequestDto,
  ): Promise<StudentCompanyContractResponseDto> {
    const contract = await this.getContractOrThrow(contractId);

    if (contract.status === StudentCompanyContractStatus.CANCELLED)
      throw new StudentCompanyContractAlreadyCancelledException();

    contract.status = StudentCompanyContractStatus.CANCELLED;
    contract.cancellationReason = dto.cancellationReason;
    contract.cancelledBy = dto.cancelledBy;
    contract.cancellationDate = dto.cancellationDate || new Date();

    await contract.save();

    await contract.populate([
      STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.STUDENT,
      STUDENT_COMPANY_CONTRACT_POPULATE_OPTIONS.COMPANY,
    ]);

    return this.contractMapper.toStudentCompanyContractResponseDto(contract);
  }

  async deleteStudentCompanyContract(contractId: string): Promise<void> {
    const contract = await this.getContractOrThrow(contractId);
    await contract.softDelete();
  }

  private async getContractOrThrow(
    contractId: string,
  ): Promise<StudentCompanyContractDocument> {
    const contract = await this.contractModel.findById(contractId);
    if (!contract) throw new StudentCompanyContractNotFoundException();
    return contract;
  }

  async validateStudentHasNoActiveOrPendingContract(
    studentId: string,
  ): Promise<void> {
    const active = await this.contractModel.findOne({
      student: studentId,
      status: {
        $in: [
          StudentCompanyContractStatus.ACTIVE,
          StudentCompanyContractStatus.PENDING_SIGNATURE,
        ],
      },
    });
    if (active) throw new StudentHasAlreadyActiveContractException();
  }

  async validateStudentHasNoActiveContract(studentId: string): Promise<void> {
    const active = await this.contractModel.findOne({
      student: studentId,
      status: StudentCompanyContractStatus.ACTIVE,
    });
    if (active) throw new StudentHasAlreadyActiveContractException();
  }

  private buildFilterQuery(
    filter: StudentCompanyContractFilter,
  ): Record<string, any> {
    const query: Record<string, any> = {};
    if (filter.student) query.student = filter.student;
    if (filter.company) query.company = filter.company;
    if (filter.status) query.status = filter.status;
    return query;
  }

  private async validateRelatedEntitiesExist(
    studentId: string,
    companyId: string,
  ): Promise<void> {
    await this.studentService.validateStudentExists(studentId);
    await this.companyService.validateCompanyExists(companyId);
  }

  private async validateContractCreation(
    dto: CreateStudentCompanyContractRequestDto,
    file?: Express.Multer.File,
  ): Promise<void> {
    if (dto.status === StudentCompanyContractStatus.ACTIVE && !file) {
      throw new StudentCompanyContractMissingException();
    }
    await this.validateRelatedEntitiesExist(dto.student, dto.company);
    await this.validateStudentHasNoActiveOrPendingContract(dto.student);
  }

  private async uploadContractFile(file: Express.Multer.File): Promise<string> {
    const uploaded = await this.fileService.uploadFile({
      file,
      isPublic: false,
      folder: FILE_FOLDERS.STUDENT_COMPANY_CONTRACTS,
    });
    return uploaded.fileKey;
  }

  private emitIfActivated(contract: StudentCompanyContractResponseDto): void {
    if (contract.status === StudentCompanyContractStatus.ACTIVE) {
      this.eventEmitter.emit(STUDENT_COMPANY_CONTRACT_EVENTS.ACTIVATED, {
        studentCompanyContract: contract,
      });
    }
  }
}
