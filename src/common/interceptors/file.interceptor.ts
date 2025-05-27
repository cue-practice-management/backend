import { FileInterceptor } from '@nestjs/platform-express';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { multerFileFilter, multerOptions } from 'file/file.config';

export function GetFile(fieldName = 'file') {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        ...multerOptions,
        fileFilter: multerFileFilter,
      }),
    ),
  );
}
