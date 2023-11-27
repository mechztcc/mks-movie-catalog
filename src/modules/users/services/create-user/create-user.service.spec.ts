import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../../../../test/test-utils/sqlite.module';
import { CreateUserService } from './create-user.service';
import { BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [CreateUserService],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const payload = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: '123456',
    };

    const user = await service.execute(payload);
    expect(user).toHaveProperty('id');
  });

  it('should be return an user with null password when create with success', async () => {
    const payload = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: '123456',
    };

    const user = await service.execute(payload);
    expect(user).toHaveProperty('id');
    expect(user.password).toBeNull();
  });

  it('should return status code 400 when try to create an user with email already in use', async () => {
    const payload = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: '123456',
    };

    const user = await service.execute(payload);
    await service.execute(payload).catch((e) => {
      expect(e).toBeInstanceOf(BadRequestException);
    });
  });
});
