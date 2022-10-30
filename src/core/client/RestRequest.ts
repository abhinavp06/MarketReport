import RestMethod from './RestMethod';

export default interface RestRequest<B = any> {
  url: string;
  method: RestMethod;
  headers?: Record<string, string>;
  body?: B;
  params?: Record<string, string>;
  query?: Record<string, string>;
  timeout?: number;
}
