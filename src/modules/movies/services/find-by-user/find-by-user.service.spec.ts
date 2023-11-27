import { Test, TestingModule } from '@nestjs/testing';
import { FindByUserService } from './find-by-user.service';

describe('FindByUserService', () => {
  let service: FindByUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByUserService],
    }).compile();

    service = module.get<FindByUserService>(FindByUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
