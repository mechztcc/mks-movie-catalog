import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMovieService } from './update-movie.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { TypeOrmSQLITETestingModule } from '../../../../../test/test-utils/sqlite.module';


describe('UpdateMovieService', () => {
  let service: UpdateMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [UpdateMovieService, { provide: CACHE_MANAGER, useValue: {}}],
    }).compile();

    service = module.get<UpdateMovieService>(UpdateMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
