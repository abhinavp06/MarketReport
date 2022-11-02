import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';
import { StockPriceDetails } from '../common/report/models/StockPriceDetails';

export const convertExcelToJSON = (
  file: Express.Multer.File,
): StockPriceDetails[] => {
  const currentDate: string = new Date().getTime().toString();
  const filePath: string = process.env.TEMP_FILES_BASE_PATH.concat(
    currentDate.concat(file.originalname),
  );

  fs.writeFileSync(filePath, file.buffer);

  const workbook: WorkBook = xlsx.readFile(filePath, {
    dateNF: 'mm/dd/yyyy',
  });

  const ws: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

  const data: unknown[] = xlsx.utils.sheet_to_json(ws, {
    raw: false,
  });

  return mapRawStockJSONToDetailObject(data);
};

const mapRawStockJSONToDetailObject = (
  data: unknown[],
): StockPriceDetails[] => {
  return data.map((obj) => {
    return {
      date: Object.values(obj)[0],
      price: Object.values(obj)[1],
      open: Object.values(obj)[2],
      high: Object.values(obj)[3],
      low: Object.values(obj)[4],
    };
  });
};
