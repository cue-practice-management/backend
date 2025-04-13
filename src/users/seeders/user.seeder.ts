import { DocumentType } from "@common/enums/document-type.enum";
import { Gender } from "@common/enums/gender.enum";
import { UserRole } from "@common/enums/role.enum";
import { AppLogger } from "@common/loggers/app.logger";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "@users/dtos/create-user.dto";
import { UserService } from "@users/user.service";

@Injectable()
export class UserSeeder implements OnModuleInit {
    constructor(
        private readonly userService: UserService, 
        private readonly configService: ConfigService,
        private readonly logger: AppLogger
    ) { }

    async onModuleInit() {
        await this.seedSuperAdmin();
    }

    private async seedSuperAdmin() {
        const adminUser = this.buildAdminUser();
        const existingUser = await this.userService.findByEmail(adminUser.email);

        if(existingUser){
            this.logger.log(`Super admin user already exists: ${adminUser.email}`);
            return;
        }

        try {
            await this.userService.createUser(adminUser);
            this.logger.log(`Super admin user created successfully: ${adminUser.email}`);
        } catch (error) {
            this.logger.error(`Error creating super admin user: ${error.message}`);
        }

    }


    private buildAdminUser(): CreateUserDto {

        const adminEmail = this.configService.get<string>('SUPER_ADMIN_EMAIL');
        const adminPassword = this.configService.get<string>('SUPER_ADMIN_PASSWORD');
        const adminPhone = this.configService.get<string>('SUPER_ADMIN_PHONE');
        const adminDocumentNumber = this.configService.get<string>('SUPER_ADMIN_DOCUMENT_NUMBER');

        if(!adminEmail || !adminPassword || !adminPhone || !adminDocumentNumber) {
            this.logger.error('Missing environment variables for super admin user creation.');
            throw new Error('Missing environment variables for super admin user creation.');
        }

        return {
            email: adminEmail,
            password: adminPassword,
            phoneNumber: adminPhone,
            documentNumber: adminDocumentNumber,
            firstName: 'Super',
            lastName: 'Admin',
            role: UserRole.ADMIN,
            typeOfDocument: DocumentType.CC,
            gender: Gender.OTHER
        };
    }
}