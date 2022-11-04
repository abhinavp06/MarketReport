import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';
import { StockPriceDetails } from '../common/report/models/StockPriceDetails';
import { deleteFile } from './FileUtils';

export const convertExcelToJSON = (
  file: Express.Multer.File,
): StockPriceDetails[] => {
  const currentDate: string = new Date().getTime().toString();
  const filePath: string = `.`.concat(
    process.env.TEMP_FILES_BASE_PATH.concat(
      currentDate.concat(file.originalname),
    ),
  );

  fs.writeFileSync(filePath, file.buffer);

  const workbook: WorkBook = xlsx.readFile(filePath, {
    dateNF: 'mm/dd/yyyy',
  });

  const ws: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

  const data: unknown[] = xlsx.utils.sheet_to_json(ws, {
    raw: false,
  });

  deleteFile(filePath);

  return mapRawStockJSONToDetailObject(data);
};

const mapRawStockJSONToDetailObject = (
  data: unknown[],
): StockPriceDetails[] => {
  return data.map((obj) => {
    return {
      date: Object.values(obj)[0],
      price: convertPriceStringToNumber(Object.values(obj)[1]),
      open: convertPriceStringToNumber(Object.values(obj)[2]),
      high: convertPriceStringToNumber(Object.values(obj)[3]),
      low: convertPriceStringToNumber(Object.values(obj)[4]),
    };
  });
};

const convertPriceStringToNumber = (stringValue: string): number => {
  return Number(stringValue.replace(/,/g, ''));
};
