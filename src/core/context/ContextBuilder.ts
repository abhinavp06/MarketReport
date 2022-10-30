import BaseContext from '../base/BaseContext';
import IConfiguration from '../base/IConfiguration';
import TestContext from '../common/test/TestContext';
import UseCaseContext from '../common/usecase/UseCaseContext';
import MiddlewareContext from '../middleware/MiddlewareContext';
import Context from './Context';

export default class ContextBuilder {
  middleware: MiddlewareContext;
  configuration: IConfiguration;
  base: BaseContext;
  useCase: UseCaseContext;
  test: TestContext;

  setConfiguration(configuration: IConfiguration) {
    this.configuration = configuration;
    return this;
  }
  setBaseContext(context: BaseContext) {
    this.base = context;
    return this;
  }

  setMiddlewareContext(middleware: MiddlewareContext) {
    this.middleware = middleware;
    return this;
  }

  setTestContext(context: TestContext) {
    this.test = context;
    return this;
  }

  setUseCaseContext(context: UseCaseContext) {
    this.useCase = context;
    return this;
  }

  build() {
    return new Context({
      middleware: this.middleware,
      configuration: this.configuration,
      base: this.base,
      useCase: this.useCase,
      test: this.test,
    });
  }
}
