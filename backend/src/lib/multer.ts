import multer from 'multer';
import DatauriParser from 'datauri/parser';
import path from 'path';

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage }).single('photo');

const parser = new DatauriParser();
// Converts buffer to data url
export const dataUri = (file: Express.Multer.File): DatauriParser =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);
