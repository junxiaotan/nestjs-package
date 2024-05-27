import { ModuleMetadata, Type } from '@nestjs/common';

export interface IBootstrapOptions {
  configOptions?: {
    yamlFile: string | string[];
  };
  scheduler?: {
    enabled: boolean;
  }
}

export interface IBootstrapOptionsFactory {
  createBootstrapOptions(): Promise<IBootstrapOptions> | IBootstrapOptions;
}

export interface IBootstrapModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<IBootstrapOptionsFactory>;
  useClass?: Type<IBootstrapOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<IBootstrapOptions> | IBootstrapOptions;
  inject?: any[];
}
