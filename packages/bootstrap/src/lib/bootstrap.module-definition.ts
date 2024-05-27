import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IBootstrapOptions } from './bootstrap.interface';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE
} = new ConfigurableModuleBuilder<IBootstrapOptions>().setExtras({
  isGlobal: true,
}, (definition, extras) => {
  // console.log('ConfigurableModuleBuilder:definition,extras', definition,extras);
  return {
    ...definition,
    global: extras.isGlobal,
  }
}).build();
