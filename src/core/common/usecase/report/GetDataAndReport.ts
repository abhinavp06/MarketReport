import { PinoLogger } from 'nestjs-pino';
import { convertExcelToJSON } from 'src/core/utils/ConvertExcelToJSON';
import { ReportProcessingResponse } from '../../report/models/ReportProcessingResponse';
import { StockPriceDetails } from '../../report/models/StockPriceDetails';
import { ReportStringEnum } from '../../report/ReportStringEnum';

export default class GetDataAndReport {
  private logger: PinoLogger;

  constructor({ logger }: { logger: PinoLogger }) {
    this.logger = logger;
  }

  async consume(
    comparisonDifference: number,
    file: Express.Multer.File,
  ): Promise<ReportProcessingResponse> {
    let result: ReportProcessingResponse = this.validateFile(file);

    if (!result) {
      result = await this.processStockPrices(
        comparisonDifference ? comparisonDifference : 1,
        file,
      );
    }

    return result;
  }

  private validateFile = (
    file: Express.Multer.File,
  ): ReportProcessingResponse => {
    if (!file) {
      this.logger.error(`No file found to process.`);
      return {
        reportString: ReportStringEnum.processingError,
        additionalMessage: `No file found!`,
      };
    }

    const fileExtension: string = file.originalname.substring(
      file.originalname.indexOf(`.`),
    );

    if (fileExtension !== `.xlsx`) {
      this.logger.error(`Invalid file extension ${fileExtension}`);
      return {
        reportString: ReportStringEnum.processingError,
        additionalMessage: `Invalid file extension ${fileExtension}. Server only accepts .xlsx files!`,
      };
    }
  };

  private processStockPrices = async (
    comparisonDifference: number,
    file: Express.Multer.File,
  ): Promise<ReportProcessingResponse> => {
    try {
      const stockPrices: StockPriceDetails[] = convertExcelToJSON(file);

      this.logger.info(
        `Successfully processed stock prices of ${stockPrices.length} days. Comparison difference: ${comparisonDifference}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to process ${file.originalname}. Reason: ${error}`,
      );
      return {
        reportString: ReportStringEnum.processingError,
        additionalMessage: `Failed to process file ${file.originalname}`,
      };
    }

    return {
      reportString: ReportStringEnum.successResponse,
      additionalMessage: `${file.originalname} was processed successfully! Email has been sent.`,
    };
  };
}
