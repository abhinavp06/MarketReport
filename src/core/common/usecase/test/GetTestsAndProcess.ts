import Test from '../../test/models/Test';
import TestService from '../../test/TestService';
import { PinoLogger } from 'nestjs-pino';

export default class GetTestsAndProcess {
  private logger: PinoLogger;
  private testService: TestService;

  constructor({
    logger,
    testService,
  }: {
    testService: TestService;
    logger: PinoLogger;
  }) {
    this.logger = logger;
    this.testService = testService;
  }

  async consume(): Promise<Test[]> {
    const tests: Test[] = await this.testService.getAllTests();

    this.logger.info(`Fetched tests: ${tests}`);

    return tests;
  }
}
