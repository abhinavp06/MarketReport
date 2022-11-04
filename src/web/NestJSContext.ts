import { PinoLogger } from 'nestjs-pino';
import BaseContext from 'src/core/base/BaseContext';
import IConfiguration from 'src/core/base/IConfiguration';
import RestClient from 'src/core/client/RestClient';
import UseCaseContext from 'src/core/common/usecase/UseCaseContext';
import Context from 'src/core/context/Context';
import ContextBuilder from 'src/core/context/ContextBuilder';
import MiddlewareContext from 'src/core/middleware/MiddlewareContext';
import AxiosRestClient from './client/AxiosRestClient';
import Configuration from './integration/Configuration';

export default {
  provide: 'Core',
  useFactory: (
    restClient: RestClient,
    configuration: IConfiguration,
    logger: PinoLogger,
  ): Context => {
    const baseContext: BaseContext = new BaseContext({
      logger,
      configuration,
    });

    const middlewareContext: MiddlewareContext = new MiddlewareContext({
      logger,
    });

    const useCaseContext: UseCaseContext = new UseCaseContext({
      restClient: restClient,
      logger: logger,
    });

    return new ContextBuilder()
      .setConfiguration(configuration)
      .setBaseContext(baseContext)
      .setMiddlewareContext(middlewareContext)
      .setUseCaseContext(useCaseContext)
      .build();
  },
  inject: [AxiosRestClient, Configuration, PinoLogger],
};
