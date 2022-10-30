import TestGateway from './TestGateway';
import TestService from './TestService';
import { PinoLogger } from 'nestjs-pino';

export default class TestContext {
  gateway: TestGateway;
  service: TestService;
  logger: PinoLogger;

  constructor({
    gateway,
    logger,
  }: {
    gateway: TestGateway;
    logger: PinoLogger;
  }) {
    this.gateway = gateway;
    this.logger = logger;
    this.service = new TestService({
      gateway,
      logger,
    });
  }
}
