import { PinoLogger } from 'nestjs-pino';
import RestClient from 'src/core/client/RestClient';
import GetDataAndReport from 'src/core/common/usecase/report/GetDataAndReport';
import { DeleteTemporaryFiles } from './files/DeleteTemporaryFiles';
export default class UseCaseContext {
  restClient: RestClient;
  logger: PinoLogger;

  getDataAndReport: GetDataAndReport;
  deleteTemporaryFiles: DeleteTemporaryFiles;

  constructor({
    restClient,
    logger,
  }: {
    restClient: RestClient;
    logger: PinoLogger;
  }) {
    this.restClient = restClient;
    this.logger = logger;

    this.getDataAndReport = new GetDataAndReport({ logger });
    this.deleteTemporaryFiles = new DeleteTemporaryFiles({ logger });
  }
}
