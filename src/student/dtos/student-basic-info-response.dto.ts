import { DocumentType } from "@common/enums/document-type.enum";
import { Gender } from "@common/enums/gender.enum";

export class StudentBasicInfoResponseDto {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl?: string;
    gender: Gender;
    phoneNumber?: string;
    documentNumber: string;
    typeOfDocument?: DocumentType;
}