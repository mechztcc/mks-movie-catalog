import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Movie } from './entities/movie.entity';
import { MovieController } from './controllers/movie.controller';
import { CreateMovieService } from './services/create-movie/create-movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movie])],
  controllers: [MovieController],
  providers: [CreateMovieService],
})
export class MoviesModule {}
