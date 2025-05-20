import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument, StudentSchema } from './schemas/student.schema';
import { Model, PaginateModel } from 'mongoose';
import { UserService } from '@user/user.service';
import { CreateStudentRequestDto } from './dtos/create-student-request.dto';
import { StudentResponseDto } from './dtos/student.response.dto';
import { AcademicProgramService } from '@academic-program/academic-program.service';
import { STUDENT_POPULATION_OPTIONS } from './constants/student.constants';
import { StudentMapper } from './mapper/student.mapper';
import { User, UserDocument } from '@user/schemas/user.schema';
import { UserRole } from '@common/enums/role.enum';

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
        this.studentModel = this.userModel.discriminators?.[UserRole.STUDENT] as PaginateModel<StudentDocument>;

    }

    async createStudent(createStudentDto: CreateStudentRequestDto): Promise<StudentResponseDto> {
        const student = new this.studentModel(createStudentDto);

        await this.userService.validateUniqueFields(createStudentDto);
        await this.academicProgramService.validateAcademicProgramExists(createStudentDto.academicProgram)

        await student.save();
        await student.populate([
            STUDENT_POPULATION_OPTIONS.ACADEMIC_PROGRAM,
            STUDENT_POPULATION_OPTIONS.COMPANY
        ]);


        return this.studentMapper.toStudentResponseDto(student);
    }
}
