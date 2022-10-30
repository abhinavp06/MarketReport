import RestClient from 'src/core/client/RestClient';
import TestContext from '../test/TestContext';
import GetTestsAndProcess from './test/GetTestsAndProcess';
import { PinoLogger } from 'nestjs-pino';
export default class UseCaseContext {
  restClient: RestClient;
  logger: PinoLogger;
  testContext: TestContext;

  getTestAndProcess: GetTestsAndProcess;

  constructor({
    restClient,
    testContext,
    logger,
  }: {
    restClient: RestClient;
    testContext: TestContext;
    logger: PinoLogger;
  }) {
    this.restClient = restClient;
    this.logger = logger;
    this.testContext = testContext;

    this.getTestAndProcess = new GetTestsAndProcess({
      logger,
      testService: this.testContext.service,
    });
  }
}
