import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyRequestDto } from './dtos/create-faculty-request.dto';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FacultyFilterDto } from './dtos/faculty-filter.dto';
import { UpdateFacultyRequestDto } from './dtos/update-faculty-request.dto';

@Controller('faculty')
export class FacultyController {
    constructor(
        private readonly facultyService: FacultyService,
    ) { }

    @Post('create')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async createFaculty(@Body() createFacultyRequestDto: CreateFacultyRequestDto) {
        return await this.facultyService.createFaculty(createFacultyRequestDto);
    }

    @Get()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async getByCriteria(@Query() filter: FacultyFilterDto) {
        return this.facultyService.getByCriteria(filter);
    }

    @Get('typeahead')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async getFacultyTypeahead(@Query('query') query: string) {
        return await this.facultyService.getFacultyTypeahead(query);
    }
    
    @Get(':facultyId')
    @UseGuards(AuthGuard)
    async getFacultyById(@Param('facultyId', ParseObjectIdPipe) facultyId: string) {
        return await this.facultyService.getFacultyById(facultyId);
    }

    @Put('update/:facultyId')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async updateFaculty(@Param('facultyId', ParseObjectIdPipe) facultyId: string, @Body() updateFacultyRequestDto: UpdateFacultyRequestDto,) {
        return await this.facultyService.updateFaculty(facultyId, updateFacultyRequestDto);
    }

    @Delete('delete/:facultyId')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @HttpCode(204)
    async deleteFaculty(@Param('facultyId', ParseObjectIdPipe) facultyId: string) {
        await this.facultyService.deleteFaculty(facultyId);
    }

}
