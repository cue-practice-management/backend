import { TypeaheadItem } from "@common/dtos/typeahead-item.dto";
import { PaginatedResult } from "@common/types/paginated-result";
import { Injectable } from "@nestjs/common";
import { FacultyCreatedResponseDto } from "faculty/dtos/faculty-created-response.dto";
import { Faculty, FacultyDocument } from "faculty/schemas/faculty.schema";
import { PaginateResult } from "mongoose";

@Injectable({})
export class FacultyMapper {

    toCreateFacultyResponseDto(faculty: Faculty): FacultyCreatedResponseDto {
        return {
            _id: faculty._id.toString(),
            name: faculty.name,
            description: faculty.description,
            deanName: faculty.deanName,
            deanEmail: faculty.deanEmail,
            createdAt: faculty.createdAt,
            updatedAt: faculty.updatedAt
        };
    }

    toFacultyResponseDto(faculty: Faculty): FacultyCreatedResponseDto {
        return {
            _id: faculty._id.toString(),
            name: faculty.name,
            description: faculty.description,
            deanName: faculty.deanName,
            deanEmail: faculty.deanEmail,
            createdAt: faculty.createdAt,
            updatedAt: faculty.updatedAt
        };
    }

    toFacultyResponsePaginatedDto(paginatedResult: PaginateResult<FacultyDocument>): PaginatedResult<FacultyCreatedResponseDto> {
        return {
            docs: paginatedResult.docs.map(faculty => this.toFacultyResponseDto(faculty)),
            totalDocs: paginatedResult.totalDocs,
            totalPages: paginatedResult.totalPages,
            page: paginatedResult.page,
            limit: paginatedResult.limit
        };
    }

    toFacultyTypeaheadItem(faculty: Faculty): TypeaheadItem {
        return {
            value: faculty._id.toString(),
            label: faculty.name,
        };
    }
}