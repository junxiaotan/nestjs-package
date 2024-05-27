import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Bootstrap_Options_Token } from './bootstrap.constants';
import { BootstrapController } from './bootstrap.controller';
import { IBootstrapModuleAsyncOptions, IBootstrapOptions, IBootstrapOptionsFactory } from './bootstrap.interface';
import { BootstrapService } from './bootstrap.service';

@Module({})
export class BootstrapModule {
  static register(options: IBootstrapOptions): DynamicModule {
    console.log('BootstrapModule.register:options', options);
    return {
      global     : true,
      module     : BootstrapModule,
      controllers: [BootstrapController],
      providers  : [BootstrapService],
      exports    : [BootstrapService]
    };
  }

  static registerAsync(asyncOptions: IBootstrapModuleAsyncOptions) {
    console.log('BootstrapModule.registerAsync:asyncOptions', asyncOptions);
    const providers = this.createAsyncProviders(asyncOptions);
    console.log('BootstrapModule.registerAsync:providers', providers);
    return {
      global   : true,
      module   : BootstrapModule,
      imports  : [],
      providers: [BootstrapService, ...providers],
      exports  : [BootstrapService]
    };
  }

  private static createAsyncProviders(
    options: IBootstrapModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      const asyncOptionsProvider = this.createAsyncOptionsProvider(options);
      console.log('BootstrapModule.createAsyncProviders:asyncOptionsProvider', asyncOptionsProvider);
      return [asyncOptionsProvider];
    }
    const providers = [this.createAsyncOptionsProvider(options)];
    console.log('BootstrapModule.createAsyncProviders:providers', providers);
    if (options.useClass) {
      providers.push({
        provide : options.useClass,
        useClass: options.useClass
      });
    }
    return providers;
  }

  private static createAsyncOptionsProvider(
    options: IBootstrapModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide   : Bootstrap_Options_Token,
        useFactory: options.useFactory,
        inject    : options.inject || []
      };
    }
    const inject = [];
    if (options.useExisting) {
      inject.push(options.useExisting);
    } else {
      if (options.useClass) {
        inject.push(options.useClass);
      }
    }
    return {
      provide   : Bootstrap_Options_Token,
      useFactory: async (optionsFactory: IBootstrapOptionsFactory) =>
        await optionsFactory.createBootstrapOptions(),
      inject    : inject
    };
  }

  private static initConfigurationModule() {}
}
