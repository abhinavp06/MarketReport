import { PinoLogger } from 'nestjs-pino';
import { ReportProcessingResponse } from '../../report/models/ReportProcessingResponse';
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
      const n: number = comparisonDifference || 1;

      this.logger.info(`n = ${n}`);

      result = {
        reportString: ReportStringEnum.successResponse,
        additionalMessage: `${file.originalname} was processed successfully! Email has been sent.`,
      };
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
}
