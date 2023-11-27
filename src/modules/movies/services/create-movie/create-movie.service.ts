import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../../dto/create-movie.dto';
import { Movie } from '../../entities/movie.entity';

interface IRequest {
  data: CreateMovieDto;
  userId: number;
}

@Injectable()
export class CreateMovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute({ data, userId }: IRequest): Promise<any> {
    const movie = this.moviesRepository.create({
      age: data.age,
      description: data.description,
      duration: data.duration,
      name: data.name,
      release: data.release,
      user: { id: userId },
    });

    await this.cacheService.reset();

    return await this.moviesRepository.save(movie);
  }
}
