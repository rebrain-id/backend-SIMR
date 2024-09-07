import { HttpException, Injectable } from '@nestjs/common';

import { extname } from 'path';

@Injectable()
export class UploadService {
  validateFile(file, fieldName: string) {
    const allowedExtensions =
      fieldName === 'absent' ? ['.jpg', '.jpeg', '.png'] : ['.pdf'];

    if (!allowedExtensions.includes(extname(file.originalname))) {
      throw new HttpException('Invalid file type', 400);
    }
  }

  async handleUploadedFiles(photo, pdf) {
    if (photo) {
      this.validateFile(photo, 'photo'); // Validasi file foto
    }
    if (pdf) {
      this.validateFile(pdf, 'pdf'); // Validasi file PDF
    }
    // Di sini Anda bisa menambahkan logika tambahan untuk memproses file
    // Contoh: menyimpan informasi file ke database atau melakukan manipulasi file

    return {
      photoPath: photo ? photo.path : null,
      pdfPath: pdf ? pdf.path : null,
    };
  }
}
