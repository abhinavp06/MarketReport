import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IConfiguration from 'src/core/base/IConfiguration';

@Injectable()
export default class Configuration implements IConfiguration {
  port: string;
  nodeENV: string;

  constructor(configService: ConfigService) {
    this.port = configService.get<string>('PORT');
    this.nodeENV = configService.get<string>('NODE_ENV');
    console.log(this);
  }
}
