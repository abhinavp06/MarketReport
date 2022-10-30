import RestRequest from 'src/core/client/RestRequest';
import RestMethod from 'src/core/client/RestMethod';

export default class RestRequestBuilder<B = any> {
  url: string;
  method: RestMethod;
  headers: Record<string, unknown>;
  body: B;
  subscriptionKey: string;
  params: Record<string, string>;
  query: Record<string, string>;
  timeout: number;

  fromRequest(request: RestRequest<B>): RestRequestBuilder<B> {
    this.url = request.url;
    this.method = request.method;
    this.headers = request.headers;
    this.body = request.body;
    this.params = request.params;
    this.timeout = request.timeout;
    return this;
  }

  setUrl(url: string): RestRequestBuilder<B> {
    this.url = url;
    return this;
  }

  setMethod(method: RestMethod): RestRequestBuilder<B> {
    this.method = method;
    return this;
  }

  setHeaders(headers: Record<string, unknown>): RestRequestBuilder<B> {
    this.headers = headers;
    return this;
  }

  setBody(body: B): RestRequestBuilder<B> {
    this.body = body;
    return this;
  }

  setSubscriptionKey(key: string): RestRequestBuilder<B> {
    this.subscriptionKey = key;
    return this;
  }

  setParams(params: Record<string, string>): RestRequestBuilder<B> {
    this.params = params;
    return this;
  }

  setQuery(query: Record<string, string>): RestRequestBuilder<B> {
    this.query = query;
    return this;
  }

  setTimeout(timeout: number): RestRequestBuilder<B> {
    this.timeout = timeout;
    return this;
  }

  build(): RestRequest<B> {
    return JSON.parse(
      JSON.stringify({
        url: this.url,
        method: this.method,
        headers: {
          'Ocp-Apim-Subscription-Key': this.subscriptionKey,
          ...this.headers,
        },
        body: this.body,
        params: this.params,
        query: this.query,
        timeout: this.timeout,
      }),
    );
  }
}
