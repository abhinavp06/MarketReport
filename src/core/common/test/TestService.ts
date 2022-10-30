import Test from './models/Test';
import TestGateway from './TestGateway';
import { PinoLogger } from 'nestjs-pino';

export default class TestService {
  private gateway: TestGateway;
  private logger: PinoLogger;

  constructor({
    gateway,
    logger,
  }: {
    gateway: TestGateway;
    logger: PinoLogger;
  }) {
    this.gateway = gateway;
    this.logger = logger;
  }

  async getAllTests(): Promise<Test[]> {
    try {
      return this.gateway.getAllTests();
    } catch (error) {
      this.logger.error(`Failed to get tests. Reason: ${error}`);
    }
  }
}
