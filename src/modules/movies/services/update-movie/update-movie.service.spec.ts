import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMovieService } from './update-movie.service';

describe('UpdateMovieService', () => {
  let service: UpdateMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateMovieService],
    }).compile();

    service = module.get<UpdateMovieService>(UpdateMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
