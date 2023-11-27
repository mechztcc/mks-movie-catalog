import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../src/modules/movies/entities/movie.entity';
import { User } from '../../src/modules/users/entities/user.entity';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [User, Movie],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([User, Movie]),
];
