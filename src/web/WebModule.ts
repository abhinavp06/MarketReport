import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from './CoreModule';
import { FilesController } from './files/FilesController';
import HttpResponseInterceptor from './middleware/HttpResponseInterceptor';
import TimingInterceptor from './middleware/TimingInterceptor';
import { ReportController } from './report/ReportController';

@Module({
  imports: [CoreModule],
  controllers: [ReportController, FilesController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimingInterceptor },
  ],
})
export class WebModule {}
