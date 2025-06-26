import { NotificationType } from "notification/enums/notification-type.enum";

export interface StudentCompanyContractActivatedMetadata {
    contractId: string;
}


export interface NotificationMetadataMap {
    [NotificationType.STUDENT_COMPANY_CONTRACT_ACTIVATED]: StudentCompanyContractActivatedMetadata;
}

export type NotificationMetadata = NotificationMetadataMap[keyof NotificationMetadataMap];