/* eslint-disable @typescript-eslint/no-var-requires */
import TestEntityGateway from './testEntity/TestEntityGateway';
import { PinoLogger } from 'nestjs-pino';
import { Module } from '@nestjs/common';

const appLogger: PinoLogger = require('pino-caller')(
  require('pino')({
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:hh:MM:ss TT Z',
        messageFormat: '{msg}',
      },
    },
  }),
);

@Module({
  imports: [],
  providers: [{ provide: PinoLogger, useValue: appLogger }, TestEntityGateway],
  exports: [PinoLogger, TestEntityGateway],
})
export class RepositoryModule {}
