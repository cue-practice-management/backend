import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AcademicProgramService } from './academic-program.service';
import { CreateAcademicProgramRequestDto } from './dtos/create-academic-program-request.dto';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { AcademicProgramFilterDto } from './dtos/academic-program-filter.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('academic-programs')
export class AcademicProgramController {

    constructor(private readonly academicProgramService: AcademicProgramService) { }

    @Post('create')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async createAcademicProgram(@Body() createAcademicProgramDto: CreateAcademicProgramRequestDto) {
        return await this.academicProgramService.createAcademicProgram(createAcademicProgramDto);
    }

    @Get()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async getAcademicPrograms(@Query() filter: AcademicProgramFilterDto) {
        return await this.academicProgramService.getAcademicProgramsByCriteria(filter);
    }

    @Put('/update/:academicProgramId')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async updateAcademicProgram(@Param('academicProgramId', ParseObjectIdPipe) academicProgramId: string, @Body() updateAcademicProgramDto: CreateAcademicProgramRequestDto) {
        return await this.academicProgramService.updateAcademicProgram(academicProgramId, updateAcademicProgramDto);
    }
}
