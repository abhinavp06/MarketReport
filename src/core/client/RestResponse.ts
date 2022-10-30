import RestRequest from './RestRequest';

export default interface RestResponse<D = any> {
  data: D;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  request?: RestRequest;
}
