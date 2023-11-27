import { Test, TestingModule } from '@nestjs/testing';
import { DeleteMovieService } from './delete-movie.service';
import { TypeOrmSQLITETestingModule } from '../../../../../test/test-utils/sqlite.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';


describe('DeleteMovieService', () => {
  let service: DeleteMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [DeleteMovieService, { provide: CACHE_MANAGER, useValue: {}}],
    }).compile();

    service = module.get<DeleteMovieService>(DeleteMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
