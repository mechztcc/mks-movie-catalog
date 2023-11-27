import { Test, TestingModule } from '@nestjs/testing';
import { IndexMoviesService } from './index-movies.service';

describe('IndexMoviesService', () => {
  let service: IndexMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexMoviesService],
    }).compile();

    service = module.get<IndexMoviesService>(IndexMoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
