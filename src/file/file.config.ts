import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ALLOWED_MIME_TYPES, FILE_MAX_SIZE } from './constants/file.constants';
import { FileFormatNotValidException } from './exceptions/file-format-not-valid.exception';
import { Request } from 'express';

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: FILE_MAX_SIZE,
  },
};

export const multerFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new FileFormatNotValidException(), false);
  }

  cb(null, true);
};
