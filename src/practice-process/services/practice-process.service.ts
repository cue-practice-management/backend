import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { PracticeDefinitionService } from 'practice-definition/practice-definition.service';
import { CreatePracticeProcessRequestDto } from 'practice-process/dtos/create-practice-process-request.dto';
import { StudentHasNotCompanyException } from 'practice-process/exceptions/student-has-not-company.exception';
import { PracticeProcess } from 'practice-process/schemas/practice-process.schema';
import { StudentService } from 'student/student.service';

@Injectable()
export class PracticeProcessService {

    constructor(
        @InjectModel(PracticeProcess.name)
        private readonly practiceProcessModel: PaginateModel<PracticeProcess>,
        private readonly practiceDefinitionService: PracticeDefinitionService,
        private readonly studentService: StudentService
    ) { }

    async createPracticeProcess(createPracticeProcessDto: CreatePracticeProcessRequestDto) {
        const practiceDefinition = await this.practiceDefinitionService.getPracticeDefinitionById(createPracticeProcessDto.practiceDefinition);
        const student = await this.studentService.getStudentById(createPracticeProcessDto.student);

        if (!student.currentCompany) throw new StudentHasNotCompanyException();

        const practiceProcess = new this.practiceProcessModel(createPracticeProcessDto);
        practiceProcess.practiceDefinition = new Types.ObjectId(createPracticeProcessDto.practiceDefinition);
        practiceProcess.student = new Types.ObjectId(createPracticeProcessDto.student);
    

        return await practiceProcess.save();
    }

}
