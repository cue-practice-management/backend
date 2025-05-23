export class UploadFileRequestDto {
  file: Express.Multer.File;
  isPublic: boolean;
  folder: string;
}
