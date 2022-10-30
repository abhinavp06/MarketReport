import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from './CoreModule';
import HttpResponseInterceptor from './middleware/HttpResponseInterceptor';
import TimingInterceptor from './middleware/TimingInterceptor';
import { ReportController } from './report/ReportController';

@Module({
  imports: [CoreModule],
  controllers: [ReportController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimingInterceptor },
  ],
})
export class WebModule {}
