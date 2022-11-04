import { PinoLogger } from 'nestjs-pino';
import RestClient from 'src/core/client/RestClient';
import GetDataAndReport from 'src/core/common/usecase/report/GetDataAndReport';
import { setUpNodemailer } from 'src/web/email/SetUpNodemailer';
import { DeleteTemporaryFiles } from './files/DeleteTemporaryFiles';
import ProcessDataAndSendEmail from './report/ProcessDataAndSendEmail';
export default class UseCaseContext {
  restClient: RestClient;
  logger: PinoLogger;

  getDataAndReport: GetDataAndReport;
  processDataAndSendEmail: ProcessDataAndSendEmail;
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

    this.processDataAndSendEmail = new ProcessDataAndSendEmail({ logger });
    this.getDataAndReport = new GetDataAndReport({
      logger,
      processDataAndSendEmail: this.processDataAndSendEmail,
    });
    this.deleteTemporaryFiles = new DeleteTemporaryFiles({ logger });

    this.init();
  }

  private init() {
    setUpNodemailer();
  }
}
