import { hrtime } from 'process';
import RestRequest from 'src/core/client/RestRequest';
import RestResponse from 'src/core/client/RestResponse';
import Middleware from '../Middleware';
import { PinoLogger } from 'nestjs-pino';

export default class StopTimerMiddleware
  implements Middleware<StopTimerMiddlewareOptions>
{
  logger: PinoLogger;

  constructor({ logger }: { logger: PinoLogger }) {
    this.logger = logger;
  }

  execute(options: StopTimerMiddlewareOptions): void {
    const tuple = hrtime(options.start);
    const time = `${tuple[0] + tuple[1] / Math.pow(10, 9)}`;
    this.logger.info(
      `${options.request.url} [${options.request.method}] took ${time} seconds.`,
    );
  }
}

export interface StopTimerMiddlewareOptions {
  start: [number, number];
  request: RestRequest;
  response: RestResponse;
}
