import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmSQLITETestingModule } from '../../../../../test/test-utils/sqlite.module';
import { CreateSessionService } from './create-session.service';

describe('CreateSessionService', () => {
  let service: CreateSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [CreateSessionService, JwtService],
    }).compile();

    service = module.get<CreateSessionService>(CreateSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
