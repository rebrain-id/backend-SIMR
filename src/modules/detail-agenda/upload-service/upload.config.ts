import { diskStorage } from 'multer';
import { extname } from 'path';

// Filter file berdasarkan fieldName
const fileFilter = (fieldName: string) => (req, file, callback) => {
  let allowedTypes: string[] = [];
  if (fieldName === 'absent') {
    allowedTypes = ['image/jpeg', 'image/png'];
  } else if (fieldName === 'notulen') {
    allowedTypes = ['application/pdf'];
  }

  // Memeriksa apakah tipe file diizinkan
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type'), false);
  }
};

// Opsi Multer untuk foto
export const multerPhotoOptions = {
  fileFilter: fileFilter('absent'),
  limits: {
    fileSize: 1024 * 1024 * 5, // Maksimal ukuran file 5MB
  },
};

// Opsi Multer untuk PDF
export const multerPdfOptions = {
  fileFilter: fileFilter('notulen'),
  limits: {
    fileSize: 1024 * 1024 * 5, // Maksimal ukuran file 5MB
  },
};
