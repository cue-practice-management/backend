import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { CreateStudentRequestDto } from './dtos/create-student-request.dto';
import { StudentResponseDto } from './dtos/student.response.dto';

@Controller('student')
export class StudentController {

    constructor(
        private readonly studentService: StudentService,
    ) { }

    @Post('create')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async createStudent(@Body() createStudentDto: CreateStudentRequestDto): Promise<StudentResponseDto> {
        return await this.studentService.createStudent(createStudentDto);
    }
}
