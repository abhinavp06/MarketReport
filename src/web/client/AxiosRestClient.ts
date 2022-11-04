import { Injectable } from '@nestjs/common';
import * as tracer from 'cls-rtracer';
import { v4 as uuid } from 'uuid';
import RestClient from 'src/core/client/RestClient';
import RestResponse from 'src/core/client/RestResponse';
import RestRequest from 'src/core/client/RestRequest';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export default class AxiosRestClient implements RestClient {
  logger: PinoLogger;
  constructor(private httpService: HttpService, logger: PinoLogger) {
    this.logger = logger;
    httpService.axiosRef.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    );
  }

  async callApi(request: RestRequest): Promise<RestResponse> {
    const requestId = tracer.id() || uuid();
    return firstValueFrom(
      this.httpService.request({
        url: request.url,
        method: request.method,
        data: request.body,
        headers: { 'x-request-id': requestId, ...request.headers },
        params: request.params,
        timeout: request.timeout,
      }),
    );
  }

  async getFileStream(request: RestRequest): Promise<string> {
    return firstValueFrom(
      this.httpService.get(request.url, {
        responseType: 'arraybuffer',
      }),
    ).then((response: RestResponse) =>
      Buffer.from(response.data, 'binary').toString('base64'),
    );
  }
}
