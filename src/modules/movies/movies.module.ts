import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Movie } from './entities/movie.entity';
import { MovieController } from './controllers/movie.controller';
import { CreateMovieService } from './services/create-movie/create-movie.service';
import { IndexMoviesService } from './services/index-movies/index-movies.service';
import { FindByUserService } from './services/find-by-user/find-by-user.service';
import { DeleteMovieService } from './services/delete-movie/delete-movie.service';
import { UpdateMovieService } from './services/update-movie/update-movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movie])],
  controllers: [MovieController],
  providers: [CreateMovieService, IndexMoviesService, FindByUserService, DeleteMovieService, UpdateMovieService],
})
export class MoviesModule {}
