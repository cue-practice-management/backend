import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyRequestDto } from './dtos/create-faculty-request.dto';
import { AuthGuard } from '@auth/guards/auth.guard';

@Controller('faculty')
export class FacultyController {
    constructor(
        private readonly facultyService: FacultyService,
    ) {}


    @Post('create')
    @UseGuards(AuthGuard)
    async createFaculty(@Body() createFacultyRequestDto: CreateFacultyRequestDto) {
        return ''
        return await this.facultyService.createFaculty(createFacultyRequestDto);
    }

}
