export class CompanyContractResponseDto {
  _id: string;
  company: string;
  fileUrl: string | null;
  startDate: Date;
  endDate: Date;
  status: string;
  type: string;
  observations?: string;
  createdAt: Date;
  updatedAt: Date;
}
