import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { extname } from 'path';

@Injectable()
export class FileUploadInterceptor implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req: Request, file: Express.Multer.File, callback) => {
          if (file.mimetype === 'application/pdf') {
            callback(null, 'public');
          } else if (file.mimetype.startsWith('image/')) {
            callback(null, 'public');
          } else {
            callback(new HttpException('invalid file type', 400), null);
          }
        },
        filename: (req: Request, file: Express.Multer.File, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}/${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req: Request, file: Express.Multer.File, callback) => {
        // Validasi tipe file: hanya terima PDF untuk notulen dan gambar untuk absent
        if (
          file.fieldname === 'notulen' &&
          file.mimetype !== 'application/pdf'
        ) {
          return callback(
            new BadRequestException('Only PDF files are allowed for notulen'),
            false,
          );
        }
        if (
          file.fieldname === 'absent' &&
          !file.mimetype.startsWith('image/')
        ) {
          return callback(
            new BadRequestException('Only image files are allowed for absent'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Batasan ukuran file 5MB
      },
    };
  }
}
