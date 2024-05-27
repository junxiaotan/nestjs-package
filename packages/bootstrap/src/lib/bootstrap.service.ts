import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BootstrapService {
  constructor(
    private readonly configService: ConfigService,
  ) {
    console.log('BootstrapService.constructor', this.configService.get('a'));
  }
}
