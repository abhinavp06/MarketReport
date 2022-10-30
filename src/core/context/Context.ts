import BaseContext from '../base/BaseContext';
import IConfiguration from '../base/IConfiguration';
import TestContext from '../common/test/TestContext';
import UseCaseContext from '../common/usecase/UseCaseContext';
import MiddlewareContext from '../middleware/MiddlewareContext';

export default class Context {
  middleware: MiddlewareContext;
  configuration: IConfiguration;
  base: BaseContext;
  useCase: UseCaseContext;
  test: TestContext;

  constructor({
    middleware,
    base,
    configuration,
    useCase,
    test,
  }: {
    middleware: MiddlewareContext;
    base: BaseContext;
    configuration: IConfiguration;
    useCase: UseCaseContext;
    test: TestContext;
  }) {
    this.middleware = middleware;
    this.configuration = configuration;
    this.base = base;
    this.useCase = useCase;
    this.test = test;
  }
}
