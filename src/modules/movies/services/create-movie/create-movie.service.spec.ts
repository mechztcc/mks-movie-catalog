import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieService } from './create-movie.service';
import { TypeOrmSQLITETestingModule } from '../../../../../test/test-utils/sqlite.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateMovieDto } from '../../dto/create-movie.dto';
import { faker } from '@faker-js/faker';
import { CreateUserService } from '../../../users/services/create-user/create-user.service';

describe('CreateMovieService', () => {
  let service: CreateMovieService;
  let createUser: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [
        CreateMovieService,
        CreateUserService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = module.get<CreateMovieService>(CreateMovieService);
    createUser = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create an movie', async () => {
    const payload: CreateMovieDto = {
      name: faker.internet.userName(),
      age: faker.number.int(100),
      description: faker.commerce.productDescription(),
      duration: '1h 22 min',
      release: '2020',
    };

    const user = await createUser.execute({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: '123456',
    });

    const movie = await service.execute({ data: payload, userId: user.id });
    console.log(movie);

    expect(movie).toHaveProperty('id');
  });
});
