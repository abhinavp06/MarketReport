import RestResponse from 'src/core/client/RestResponse';
import RestResponseBuilder from 'src/core/client/RestResponseBuilder';

export default class RestError extends Error {
  response: RestResponse;
  constructor(message: string, status: number) {
    super(message);
    this.response = new RestResponseBuilder().setStatus(status).build();
  }
}

export enum RestErrorEnum {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY_ERROR = 503,
  SUCCESS_RESPONSE = 200,
}
