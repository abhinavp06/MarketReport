import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';
import { StockPriceDetails } from '../common/report/models/StockPriceDetails';

export const convertExcelToJSON = (
  file: Express.Multer.File,
): StockPriceDetails[] => {
  const currentDate: string = new Date().getTime().toString();

  fs.writeFileSync(
    `./src/core/utils/${currentDate.concat(file.originalname)}`,
    file.buffer,
  );

  const workbook: WorkBook = xlsx.readFile(
    `./src/core/utils/${currentDate.concat(file.originalname)}`,
    {
      dateNF: 'mm/dd/yyyy',
    },
  );

  const ws: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

  const data: unknown[] = xlsx.utils.sheet_to_json(ws, {
    raw: false,
  });

  fs.writeFileSync(
    `./src/core/utils/${currentDate.concat(
      file.originalname.split('.')[0],
    )}.json`,
    JSON.stringify(data, null, 2),
  );

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
