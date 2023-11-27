import { Test, TestingModule } from '@nestjs/testing';
import { DeleteMovieService } from './delete-movie.service';

describe('DeleteMovieService', () => {
  let service: DeleteMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteMovieService],
    }).compile();

    service = module.get<DeleteMovieService>(DeleteMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
