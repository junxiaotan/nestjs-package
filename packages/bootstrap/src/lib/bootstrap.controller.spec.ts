import { Test } from '@nestjs/testing';
import { BootstrapController } from './bootstrap.controller';
import { BootstrapService } from './bootstrap.service';

describe('BootstrapController', () => {
  let controller: BootstrapController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BootstrapService],
      controllers: [BootstrapController],
    }).compile();

    controller = module.get(BootstrapController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
