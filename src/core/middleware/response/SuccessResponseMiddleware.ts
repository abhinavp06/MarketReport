import RestResponse from 'src/core/client/RestResponse';
import Middleware from 'src/core/middleware/Middleware';
import MimeType from '../../client/MimeType';
import { PinoLogger } from 'nestjs-pino';

export default class SuccessResponseMiddleware
  implements Middleware<SuccessResponseMiddlewareOptions>
{
  logger: PinoLogger;

  constructor({ logger }: { logger: PinoLogger }) {
    this.logger = logger;
  }

  execute(options: SuccessResponseMiddlewareOptions): RestResponse {
    if (MimeType.TEXT === options.response?.headers?.mimeType) {
      return options.response.data;
    }
    return options.callback(options.response);
  }
}
export interface SuccessResponseMiddlewareOptions {
  response: RestResponse;
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function;
}
