import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { CreateStudentRequestDto } from './dtos/create-student-request.dto';
import { StudentResponseDto } from './dtos/student-response.dto';
import { StudentFilterDto } from './dtos/student-filter.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UpdateStudentRequestDto } from './dtos/update-student-request.dto';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async createStudent(
    @Body() createStudentDto: CreateStudentRequestDto,
  ): Promise<StudentResponseDto> {
    return await this.studentService.createStudent(createStudentDto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getStudentsByCriteria(@Query() filter: StudentFilterDto) {
    return await this.studentService.getStudentsByCriteria(filter);
  }

  @Get('/me')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.STUDENT)
  async getMyProfile(
    @CurrentUser() studentId: string,
  ): Promise<StudentResponseDto> {
    return await this.studentService.getStudentById(studentId);
  }

  @Get('/typeahead')
  @UseGuards(AuthGuard)
  async getTypeahead(@Query('query') query: string): Promise<TypeaheadItem[]> {
    return this.studentService.getStudentsTypeahead(query);
  }

  @Get(':studentId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getStudentById(
    @Param('studentId', ParseObjectIdPipe) studentId: string,
  ): Promise<StudentResponseDto> {
    return await this.studentService.getStudentById(studentId);
  }

  @Put('update/:studentId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async updateStudent(
    @Param('studentId', ParseObjectIdPipe) studentId: string,
    @Body() updateStudentDto: UpdateStudentRequestDto,
  ): Promise<StudentResponseDto> {
    return await this.studentService.updateStudent(studentId, updateStudentDto);
  }

  @Delete('delete/:studentId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteStudent(
    @Param('studentId', ParseObjectIdPipe) studentId: string,
  ) {
    return await this.studentService.deleteStudent(studentId);
  }
}
