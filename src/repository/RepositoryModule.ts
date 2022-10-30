/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

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
  providers: [{ provide: PinoLogger, useValue: appLogger }],
  exports: [PinoLogger],
})
export class RepositoryModule {}
