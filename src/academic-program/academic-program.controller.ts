import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AcademicProgramService } from './academic-program.service';
import { CreateAcademicProgramRequestDto } from './dtos/create-academic-program-request.dto';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';

@Controller('academic-program')
export class AcademicProgramController {

    constructor(private readonly academicProgramService: AcademicProgramService) { }

    @Post('create')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async createAcademicProgram(@Body() createAcademicProgramDto: CreateAcademicProgramRequestDto) {
        return await this.academicProgramService.createAcademicProgram(createAcademicProgramDto);
    }

}
