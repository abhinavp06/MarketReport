import ExceptionMessages from 'src/core/common/error/types/ExceptionMessages';
import Middleware from 'src/core/middleware/Middleware';
import { PinoLogger } from 'nestjs-pino';

export default class FailureResponseMiddleware
  implements Middleware<FailureResponseMiddlewareOptions>
{
  logger: PinoLogger;

  constructor({ logger }: { logger: PinoLogger }) {
    this.logger = logger;
  }

  execute(options: FailureResponseMiddlewareOptions): void {
    this.logger.error(options.error?.stack);
    if (options.error?.config || options.error?.response) {
      options.error.status =
        options.error?.response?.status ?? options.error?.response?.statusCode;

      this.logger.error({
        url: options.error?.config?.url,
        status: options.error?.response?.status,
        response: options.error?.response?.data,
      });
    }
    if (options.error?.message === ExceptionMessages.BAD_REQUEST) {
      this.logger.error(options.error.response);
      return options.callback(options.error.response);
    }

    return options.callback(options.error);
  }
}

export interface FailureResponseMiddlewareOptions {
  error: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function;
}
