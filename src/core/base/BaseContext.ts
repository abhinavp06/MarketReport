import { PinoLogger } from 'nestjs-pino';
import IConfiguration from './IConfiguration';

export default class BaseContext {
  logger: PinoLogger;
  configuration: IConfiguration;

  constructor({
    logger,
    configuration,
  }: {
    logger: PinoLogger;
    configuration: IConfiguration;
  }) {
    this.logger = logger;
    this.configuration = configuration;
  }
}
