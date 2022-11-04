import { PinoLogger } from 'nestjs-pino';
import { convertJSONToExcel } from 'src/core/utils/ConvertJSONToExcel';
import { logic1 } from 'src/core/utils/logic/Logic1';
import { callEmailApi } from 'src/web/email/CallEmailApi';
import { ReportProcessingResponse } from '../../report/models/ReportProcessingResponse';
import { StockPriceDetails } from '../../report/models/StockPriceDetails';
export default class ProcessDataAndSendEmail {
  private logger: PinoLogger;

  constructor({ logger }: { logger: PinoLogger }) {
    this.logger = logger;
  }

  async consume({
    fileName,
    stockPrices,
    comparisonDifference,
    email,
  }: {
    fileName: string;
    stockPrices: StockPriceDetails[];
    comparisonDifference: number;
    email: string;
  }): Promise<ReportProcessingResponse> {
    const reportData: StockPriceDetails[] = logic1(
      stockPrices,
      comparisonDifference,
    );

    const generatedExcelFilePath: string = convertJSONToExcel(reportData);

    return callEmailApi({
      email: email,
      attachment: generatedExcelFilePath,
      fileName: fileName,
    });
  }
}
