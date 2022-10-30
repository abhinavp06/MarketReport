import { PinoLogger } from 'nestjs-pino';
import { ReportStringEnum } from '../../report/ReportStringEnum';

export default class GetDataAndReport {
  private logger: PinoLogger;

  constructor({ logger }: { logger: PinoLogger }) {
    this.logger = logger;
  }

  async consume(n: number): Promise<ReportStringEnum> {
    this.logger.info(`Number: ${n}`);
    return ReportStringEnum.successResponse;
  }
}
