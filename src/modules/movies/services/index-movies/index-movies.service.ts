import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { Movie } from '../../entities/movie.entity';

@Injectable()
export class IndexMoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute(): Promise<any> {
    const moviesExists = await this.cacheService.get('movies');
    if (moviesExists) {
      console.log('GETTING FROM REDIS');
      return moviesExists;
    }

    const movies = await this.moviesRepository.find();

    return movies;
  }
}
