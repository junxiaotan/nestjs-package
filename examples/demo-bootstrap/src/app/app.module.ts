import { BootstrapModule, BootstrapService } from '@nestjs-package/bootstrap';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports    : [
    BootstrapModule.register({
      configOptions: {
        yamlFile: ['config.yaml', 'config.local.yaml']
      }
    }),
  ],
  controllers: [AppController],
  providers  : [AppService]
})
export class AppModule {
  constructor(
    private readonly configService: ConfigService,
    private bootstrapService: BootstrapService
  ) {
    console.log('AppModule.constructor', this.configService.get('a'), this.configService.get('b'));
  }
}
