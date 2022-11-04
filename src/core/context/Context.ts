import BaseContext from '../base/BaseContext';
import IConfiguration from '../base/IConfiguration';
import UseCaseContext from '../common/usecase/UseCaseContext';
import MiddlewareContext from '../middleware/MiddlewareContext';

export default class Context {
  middleware: MiddlewareContext;
  configuration: IConfiguration;
  base: BaseContext;
  useCase: UseCaseContext;

  constructor({
    middleware,
    base,
    configuration,
    useCase,
  }: {
    middleware: MiddlewareContext;
    base: BaseContext;
    configuration: IConfiguration;
    useCase: UseCaseContext;
  }) {
    this.middleware = middleware;
    this.configuration = configuration;
    this.base = base;
    this.useCase = useCase;
  }
}
