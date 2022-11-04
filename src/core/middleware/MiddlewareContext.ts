import FailureResponseMiddleware, {
  FailureResponseMiddlewareOptions,
} from './response/FailureResponseMiddleware';
import SuccessResponseMiddleware, {
  SuccessResponseMiddlewareOptions,
} from './response/SuccessResponseMiddleware';
import Middleware from 'src/core/middleware/Middleware';
import StartTimerMiddleware from './timer/StartTimerMiddleware';
import StopTimerMiddleware, {
  StopTimerMiddlewareOptions,
} from './timer/StopTimerMiddleware';
import { PinoLogger } from 'nestjs-pino';

export default class MiddlewareContext {
  startTimer: Middleware<void>;
  stopTimer: Middleware<StopTimerMiddlewareOptions>;
  successResponseHandler: Middleware<SuccessResponseMiddlewareOptions>;
  failureResponseHandler: Middleware<FailureResponseMiddlewareOptions>;

  constructor({ logger }: { logger: PinoLogger }) {
    this.startTimer = new StartTimerMiddleware({ logger });
    this.stopTimer = new StopTimerMiddleware({ logger });
    this.successResponseHandler = new SuccessResponseMiddleware({ logger });
    this.failureResponseHandler = new FailureResponseMiddleware({ logger });
  }
}
