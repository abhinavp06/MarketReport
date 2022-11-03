import { PinoLogger } from 'nestjs-pino';
import { convertExcelToJSON } from 'src/core/utils/ConvertExcelToJSON';
import { ReportProcessingResponse } from '../../report/models/ReportProcessingResponse';
import { StockPriceDetails } from '../../report/models/StockPriceDetails';
import { ReportStringEnum } from '../../report/ReportStringEnum';
import ProcessDataAndSendEmail from './ProcessDataAndSendEmail';

export default class GetDataAndReport {
  private logger: PinoLogger;
  private processDataAndSendEmail: ProcessDataAndSendEmail;

  constructor({
    logger,
    processDataAndSendEmail,
  }: {
    logger: PinoLogger;
    processDataAndSendEmail: ProcessDataAndSendEmail;
  }) {
    this.logger = logger;
    this.processDataAndSendEmail = processDataAndSendEmail;
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
    let stockPrices: StockPriceDetails[];
    try {
      stockPrices = convertExcelToJSON(file);

      if (
        !this.validateComparisonDifference(comparisonDifference, stockPrices)
      ) {
        return {
          reportString: ReportStringEnum.processingError,
          additionalMessage: `Failed to process file ${file.originalname}. Comparison difference is not valid according to the number of rows in the data.`,
        };
      }
    } catch (error) {
      this.logger.error(
        `Failed to process ${file.originalname}. Reason: ${error}`,
      );
      return {
        reportString: ReportStringEnum.processingError,
        additionalMessage: `Failed to process file ${file.originalname}. Reason: ${error}`,
      };
    }

    return this.processDataAndSendEmail.consume({
      fileName: file.originalname,
      stockPrices: stockPrices,
      comparisonDifference: comparisonDifference,
    });
  };

  private validateComparisonDifference = (
    comparisonDifference: number,
    stockPrices: StockPriceDetails[],
  ): boolean => {
    const rowsCount: number = stockPrices.length;

    if (rowsCount == 0 || rowsCount == 1) return false;
    if (stockPrices[comparisonDifference]) return true;

    return false;
  };
}
