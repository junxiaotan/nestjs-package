import { Test } from '@nestjs/testing';
import { BootstrapService } from './bootstrap.service';

describe('BootstrapService', () => {
  let service: BootstrapService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BootstrapService],
    }).compile();

    service = module.get(BootstrapService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
