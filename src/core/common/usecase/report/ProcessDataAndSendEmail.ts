import { PinoLogger } from 'nestjs-pino';
import { convertJSONToExcel } from 'src/core/utils/ConvertJSONToExcel';
import { ReportProcessingResponse } from '../../report/models/ReportProcessingResponse';
import { StockPriceDetails } from '../../report/models/StockPriceDetails';
import { ReportStringEnum } from '../../report/ReportStringEnum';
export default class ProcessDataAndSendEmail {
  private logger: PinoLogger;

  constructor({ logger }: { logger: PinoLogger }) {
    this.logger = logger;
  }

  async consume({
    fileName,
    stockPrices,
    comparisonDifference,
  }: {
    fileName: string;
    stockPrices: StockPriceDetails[];
    comparisonDifference: number;
  }): Promise<ReportProcessingResponse> {
    const reportData: StockPriceDetails[] = this.generateReport(
      stockPrices,
      comparisonDifference,
    );
    const generatedExcelFilePath: string = convertJSONToExcel(reportData);
    console.log(`Generated excel file: `, generatedExcelFilePath);
    return {
      reportString: ReportStringEnum.successResponse,
      additionalMessage: `${fileName} was processed successfully! Email has been sent.`,
    };
  }

  private generateReport = (
    stockPrices: StockPriceDetails[],
    comparisonDifference: number,
  ): StockPriceDetails[] => {
    console.log(`Comparison difference: `, comparisonDifference);
    return stockPrices;
  };
}
