import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StudentDocument } from './schemas/student.schema';
import { Model, PaginateModel } from 'mongoose';
import { UserService } from '@user/user.service';
import { CreateStudentRequestDto } from './dtos/create-student-request.dto';
import { StudentResponseDto } from './dtos/student-response.dto';
import { AcademicProgramService } from '@academic-program/academic-program.service';
import {
  DEFAULT_STUDENT_SORT_OPTION,
  STUDENT_POPULATION_OPTIONS,
  STUDENT_SORT_OPTIONS,
} from './constants/student.constants';
import { StudentMapper } from './mapper/student.mapper';
import { User, UserDocument } from '@user/schemas/user.schema';
import { UserRole } from '@common/enums/role.enum';
import { StudentFilterDto } from './dtos/student-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { getSort } from '@common/utils/pagination.util';
import { StudentNotFoundException } from './exceptions/student-not-found-exception';
import { UpdateStudentRequestDto } from './dtos/update-student-request.dto';

@Injectable()
export class StudentService {
  private readonly studentModel: PaginateModel<StudentDocument>;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: PaginateModel<UserDocument>,
    private readonly userService: UserService,
    private readonly academicProgramService: AcademicProgramService,
    private readonly studentMapper: StudentMapper,
  ) {
    this.studentModel = this.userModel.discriminators?.[
      UserRole.STUDENT
    ] as PaginateModel<StudentDocument>;
  }

  async createStudent(
    createStudentDto: CreateStudentRequestDto,
  ): Promise<StudentResponseDto> {
    const student = new this.studentModel(createStudentDto);

    await this.userService.validateUniqueFields(createStudentDto);
    await this.academicProgramService.validateAcademicProgramExists(
      createStudentDto.academicProgram,
    );

    await student.save();
    await student.populate([
      STUDENT_POPULATION_OPTIONS.ACADEMIC_PROGRAM,
      STUDENT_POPULATION_OPTIONS.COMPANY,
    ]);

    return this.studentMapper.toStudentResponseDto(student);
  }

  async getStudentsByCriteria(
    studentFilter: StudentFilterDto,
  ): Promise<PaginatedResult<StudentResponseDto>> {
    const { page, limit, sortBy, sortOrder } = studentFilter;

    const filter = this.buildFilter(studentFilter);
    const sort = getSort(
      STUDENT_SORT_OPTIONS,
      DEFAULT_STUDENT_SORT_OPTION,
      sortBy,
      sortOrder,
    );

    const students = await this.studentModel.paginate(filter, {
      page,
      limit,
      sort,
      populate: [STUDENT_POPULATION_OPTIONS.ACADEMIC_PROGRAM],
    });

    return this.studentMapper.toStudentPaginatedResponseDto(students);
  }

  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentRequestDto,
  ): Promise<StudentResponseDto> {
    const student = await this.studentModel.findById(studentId);
    if (!student) {
      throw new StudentNotFoundException();
    }

    await this.userService.validateUniqueFields(updateStudentDto);
    if (updateStudentDto.academicProgram) {
      await this.academicProgramService.validateAcademicProgramExists(
        updateStudentDto.academicProgram,
      );
    }

    Object.assign(student, updateStudentDto);
    await student.save();
    await student.populate([
      STUDENT_POPULATION_OPTIONS.ACADEMIC_PROGRAM,
      STUDENT_POPULATION_OPTIONS.COMPANY,
    ]);

    return this.studentMapper.toStudentResponseDto(student);
  }

  async deleteStudent(studentId: string): Promise<void> {
    const student = await this.studentModel.findById(studentId);
    if (!student) {
      throw new StudentNotFoundException();
    }
    await student.softDelete();
  }

  private buildFilter(filter: StudentFilterDto): Record<string, any> {
    const filterObject: Record<string, any> = {};

    if (filter.fullName) {
      filterObject.$or = [
        { firstName: { $regex: filter.fullName, $options: 'i' } },
        { lastName: { $regex: filter.fullName, $options: 'i' } },
      ];
    }

    if (filter.documentNumber) {
      filterObject.documentNumber = {
        $regex: filter.documentNumber,
        $options: 'i',
      };
    }

    if (filter.email) {
      filterObject.email = { $regex: filter.email, $options: 'i' };
    }

    if (filter.gender) {
      filterObject.gender = filter.gender;
    }

    if (filter.academicProgram) {
      filterObject.academicProgram = filter.academicProgram;
    }

    if (filter.currentSemester) {
      filterObject.currentSemester = filter.currentSemester;
    }

    return filterObject;
  }
}
