import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { Movie } from '../../entities/movie.entity';

interface IRequest {
  page: number;
}

@Injectable()
export class IndexMoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute({ page = 1 }: IRequest): Promise<any> {
    const moviesExists = await this.cacheService.get(`movies-page-${page}`);
    if (moviesExists) {
      return moviesExists;
    }

    const movies = await this.moviesRepository.find({
      take: 10,
      skip: page * 10 - 10,
    });

    const totalItems = await this.moviesRepository.count();
    const totalPages = Math.round(Number((totalItems / 10)));

    const pagination = {
      data: movies,
      totalItems: totalItems,
      itemsPerPage: 10,
      totalPages: totalPages,
      previus: page - 1 !== 0 ? page - 1 : null,
    };

    if (pagination.data.length > 0) {
      await this.cacheService.set(`movies-page-${page}`, pagination);
    }

    return pagination;
  }
}
