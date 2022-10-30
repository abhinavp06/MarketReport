import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Context from 'src/core/context/Context';
import RestResponse from '../../core/client/RestResponse';

@Injectable()
export default class HttpResponseInterceptor implements NestInterceptor {
  core: Context;
  constructor(@Inject('Core') context: Context) {
    this.core = context;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    return next.handle().pipe(
      map((apiResponse: RestResponse) =>
        this.core.middleware.successResponseHandler.execute({
          response: apiResponse,
          callback: this.successCallbackCreator(response),
        }),
      ),
      catchError((error: any) => {
        return this.core.middleware.failureResponseHandler.execute({
          error,
          callback: this.failureCallback,
        });
      }),
    );
  }

  private successCallbackCreator(response: any) {
    return (apiResponse: RestResponse) => {
      response.status(apiResponse?.status || HttpStatus.OK);
      return apiResponse?.data || apiResponse;
    };
  }

  private failureCallback(error: any) {
    const status =
      error.status ||
      error?.statusCode ||
      error?.response?.statusCode ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    throw new HttpException(
      {
        statusCode: status,
        message: error.message,
        code: error?.code,
      },
      status,
    );
  }
}
