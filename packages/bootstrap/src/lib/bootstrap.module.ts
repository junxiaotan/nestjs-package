import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BootstrapController } from './bootstrap.controller';
import { IBootstrapOptions } from './bootstrap.interface';
import { BootstrapService } from './bootstrap.service';
import { initGlobalConfig } from './bootstrap.util';

@Global()
@Module({})
export class BootstrapModule {
  static register(options: IBootstrapOptions): DynamicModule {
    console.log('BootstrapModule.register:options', options);
    const moduleImports = [];
    if (options.configOptions?.yamlFile) {
      moduleImports.push(this.initConfigModule(options.configOptions.yamlFile));
    }
    return {
      global     : true,
      module     : BootstrapModule,
      imports    : moduleImports,
      controllers: [BootstrapController],
      providers  : [BootstrapService],
      exports    : [BootstrapService]
    };
  }

  static initConfigModule(yamlFile: string | string[]) {
    return ConfigModule.forRoot({
      isGlobal: true,
      load: [initGlobalConfig(yamlFile)]
    });
  }
}
