import { hrtime } from 'process';
import Middleware from '../Middleware';
import { PinoLogger } from 'nestjs-pino';

export default class StartTimerMiddleware implements Middleware<void> {
  logger: PinoLogger;

  constructor({ logger }: { logger: PinoLogger }) {
    this.logger = logger;
  }

  execute(): [number, number] {
    return hrtime();
  }
}
