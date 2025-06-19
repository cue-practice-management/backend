import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService
    ) { }

    @Get('general-metrics')
    async getGeneralMetrics() {
        return await this.dashboardService.getGeneralMetrics();
    }

    @Get('students-by-program')
    getStudentsByProgram() {
        return this.dashboardService.getStudentsByAcademicProgram();
    }

    @Get('active-practices-by-company')
    async getActivePracticesByCompany() {
        return this.dashboardService.getActivePracticesByCompany();
    }

    @Get('students-with-company-and-without-company')
    async getStudentsWithCompanyVsWithoutCompany() {
        return this.dashboardService.getStudentsWithAndWithoutCompany();
    }

    @Get('companies-by-program')
    async getCompaniesByProgram() {
        return this.dashboardService.getCompaniesByProgram();
    }

    @Get('companies-by-city')
    async getCompaniesByCity() {
        return this.dashboardService.getCompaniesByCity();
    }
}
