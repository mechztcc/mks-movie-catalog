import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieService } from './create-movie.service';

describe('CreateMovieService', () => {
  let service: CreateMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateMovieService],
    }).compile();

    service = module.get<CreateMovieService>(CreateMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
