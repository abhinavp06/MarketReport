import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from './CoreModule';
import HttpResponseInterceptor from './middleware/HttpResponseInterceptor';
import TimingInterceptor from './middleware/TimingInterceptor';
import { TestController } from './test/TestController';

@Module({
  imports: [CoreModule],
  controllers: [TestController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimingInterceptor },
  ],
})
export class WebModule {}
