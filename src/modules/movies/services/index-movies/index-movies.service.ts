import { Injectable } from '@nestjs/common';
import { Movie } from '../../entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class IndexMoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async execute(): Promise<any> {
    const movies = await this.moviesRepository.find();

    return movies;
  }
}
