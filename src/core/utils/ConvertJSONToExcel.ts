import * as xlsx from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';

export const convertJSONToExcel = (jsonObjectArray: any[]): string => {
  const currentDate: string = new Date().getTime().toString();

  const filePath: string = `.`.concat(
    process.env.TEMP_FILES_BASE_PATH.concat(
      currentDate.concat(`GeneratedExcel`),
    ),
  );

  const worksheet: WorkSheet = xlsx.utils.json_to_sheet(jsonObjectArray);
  const workbook: WorkBook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(workbook, worksheet, `Sheet1`);
  xlsx.writeFile(workbook, `${filePath}.xlsx`);

  return filePath;
};
