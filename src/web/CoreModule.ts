import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RepositoryModule } from 'src/repository/RepositoryModule';
import AxiosRestClient from './client/AxiosRestClient';
import Configuration from './integration/Configuration';
import NestJSContext from './NestJSContext';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(
      process.env.NODE_ENV == 'dev' || !process.env.NODE_ENV
        ? {
            envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
          }
        : {},
    ),
    ScheduleModule.forRoot(),
    RepositoryModule,
  ],
  controllers: [],
  providers: [AxiosRestClient, Configuration, NestJSContext],
  exports: [NestJSContext],
})
export class CoreModule {}
