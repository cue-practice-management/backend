import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { Injectable } from '@nestjs/common';
import { UploadFileRequestDto } from './dtos/upload-file-request.dto';
import { FileUploadedResponseDto } from './dtos/file-uploaded-response.dto';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { SIGNED_URL_EXPIRATION_TIME } from './constants/file.constants';

@Injectable()
export class FileService {
  private readonly s3: S3Client;

  constructor(private readonly env: EnvironmentConfigService) {
    this.s3 = new S3Client({
      region: env.awsRegion,
      credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey,
      },
    });
  }

  async uploadFile(
    uploadFileRequestDto: UploadFileRequestDto,
  ): Promise<FileUploadedResponseDto> {
    const { file, isPublic, folder } = uploadFileRequestDto;
    const extension = extname(file.originalname);

    const key = `${folder ? folder + '/' : ''}${uuidv4()}${extension}`;

    const bucket = isPublic
      ? this.env.awsPublicBucket
      : this.env.awsPrivateBucket;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
      }),
    );

    const url = isPublic
      ? `https://${bucket}.s3.${this.env.awsRegion}.amazonaws.com/${key}`
      : await this.getPrivateFileSignedUrl(key);

    return {
      fileKey: key,
      fileUrl: url,
    };
  }

  async getPrivateFileSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.env.awsPrivateBucket,
      Key: key,
    });

    return await getSignedUrl(this.s3, command, {
      expiresIn: SIGNED_URL_EXPIRATION_TIME,
    });
  }

  async deleteFile(key: string, isPublic: boolean): Promise<void> {
    const bucket = isPublic
      ? this.env.awsPublicBucket
      : this.env.awsPrivateBucket;

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
  }

  getFileKeyFromUrl(fileUrl: string): string {
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split('/');
    return pathParts[pathParts.length - 1];
  }
}
