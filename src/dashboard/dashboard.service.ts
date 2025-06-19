import { UserRole } from '@common/enums/role.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@user/schemas/user.schema';
import { PaginateModel } from 'mongoose';
import { ProfessorDocument } from 'professor/schemas/professor.schema';
import { StudentDocument } from 'student/schemas/student.schema';
import { DashboardGeneralMetricsResponseDto } from './dtos/dashboard-general-metrics-response.dto';
import { Company, CompanyDocument } from 'company/schemas/company.schema';
import { PracticeProcess, PracticeProcessDocument } from 'practice-process/schemas/practice-process.schema';
import { PracticeProcessStatus } from 'practice-process/enums/practice-process.enums';
import { groupActivePracticesByCompanyAggregation, groupCompaniesByCityAggregation, groupCompaniesByProgramAggregation, groupStudentsByAcademicProgramAggregation } from './aggregations/dashboard.aggregations';
import { DashboardChartDataResponseDto } from './dtos/dashboard-chart-data-response.dto';

@Injectable()
export class DashboardService {
    private readonly studentModel: PaginateModel<StudentDocument>;
    private readonly professorModel: PaginateModel<ProfessorDocument>;

    constructor(
        @InjectModel(User.name)
        private readonly userModel: PaginateModel<UserDocument>,
        @InjectModel(Company.name)
        private readonly companyModel: PaginateModel<CompanyDocument>,
        @InjectModel(PracticeProcess.name)
        private readonly practiceProcessModel: PaginateModel<PracticeProcessDocument>
    ) {
        this.studentModel = this.userModel.discriminators?.[UserRole.STUDENT] as PaginateModel<StudentDocument>;
        this.professorModel = this.userModel.discriminators?.[UserRole.PROFESSOR] as PaginateModel<ProfessorDocument>;
    }


    async getGeneralMetrics(): Promise<DashboardGeneralMetricsResponseDto> {
        const [totalStudents, totalStudentsWithoutCompany, totalProfessors, totalCompanies, totalPracticesInProgress] = await Promise.all([
            this.studentModel.countDocuments(),
            this.studentModel.countDocuments({ company: null }),
            this.professorModel.countDocuments(),
            this.companyModel.countDocuments(),
            this.practiceProcessModel.countDocuments({ status: PracticeProcessStatus.IN_PROGRESS })
        ]);

        return {
            totalStudents,
            totalStudentsWithoutCompany,
            totalProfessors,
            totalCompanies,
            totalPracticesInProgress
        }
    }



    async getStudentsByAcademicProgram(): Promise<DashboardChartDataResponseDto[]> {
        const pipeline = groupStudentsByAcademicProgramAggregation();
        return await this.studentModel.aggregate<DashboardChartDataResponseDto>(pipeline);
    }

    async getActivePracticesByCompany(): Promise<DashboardChartDataResponseDto[]> {
        const pipeline = groupActivePracticesByCompanyAggregation();
        return this.practiceProcessModel.aggregate<DashboardChartDataResponseDto>(pipeline);
    }

    async getStudentsWithAndWithoutCompany(): Promise<DashboardChartDataResponseDto[]> {
        const [withCompany, withoutCompany] = await Promise.all([
            this.studentModel.countDocuments({ currentCompany: { $ne: null } }),
            this.studentModel.countDocuments({ currentCompany: null }),
        ]);

        return [
            { name: 'Con Empresa', value: withCompany },
            { name: 'Sin Empresa', value: withoutCompany }
        ];
    }

    async getCompaniesByProgram(): Promise<DashboardChartDataResponseDto[]> {
        return this.companyModel.aggregate<DashboardChartDataResponseDto>(
            groupCompaniesByProgramAggregation()
        );
    }

    async getCompaniesByCity(): Promise<DashboardChartDataResponseDto[]> {
        return this.companyModel.aggregate<DashboardChartDataResponseDto>(
            groupCompaniesByCityAggregation()
        )
    }

}
