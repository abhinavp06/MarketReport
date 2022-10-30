import RestResponse from 'src/core/client/RestResponse';
import RestResponseBuilder from 'src/core/client/RestResponseBuilder';

export default class RestError extends Error {
  response: RestResponse;
  constructor(message: string, status: number) {
    super(message);
    this.response = new RestResponseBuilder().setStatus(status).build();
  }
}
export const BAD_REQUEST = 400;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const INTERNAL_SERVER_ERROR = 500;
