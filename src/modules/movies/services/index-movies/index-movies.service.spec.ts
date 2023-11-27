import { Test, TestingModule } from '@nestjs/testing';
import { IndexMoviesService } from './index-movies.service';
import { TypeOrmSQLITETestingModule } from '../../../../../test/test-utils/sqlite.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('IndexMoviesService', () => {
  let service: IndexMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [IndexMoviesService, { provide: CACHE_MANAGER, useValue: {}}],
    }).compile();

    service = module.get<IndexMoviesService>(IndexMoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
