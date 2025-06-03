import { Injectable } from "@nestjs/common";
import { StudentCompanyContractResponseDto } from "student-company-contract/dtos/student-company-contract-response.dto";
import { StudentCompanyContract } from "student-company-contract/schemas/student-company-contract.schema";

@Injectable()
export class StudentCompanyContractMapper {
    toStudentCompanyContractResponseDto(entity: StudentCompanyContract): StudentCompanyContractResponseDto {
        return {
            _id: entity._id.toString(),
        };
    }
}