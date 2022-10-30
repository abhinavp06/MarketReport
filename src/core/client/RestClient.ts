import RestRequest from './RestRequest';
import RestResponse from './RestResponse';

export default interface RestClient {
  callApi: (request: RestRequest) => Promise<RestResponse>;
  getFileStream: (request: RestRequest) => Promise<string>;
}
