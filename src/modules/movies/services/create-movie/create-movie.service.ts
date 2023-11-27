import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../entities/movie.entity';
import { CreateMovieDto } from '../../dto/create-movie.dto';

interface IRequest {
  data: CreateMovieDto;
  userId: number;
}

@Injectable()
export class CreateMovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
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

    return await this.moviesRepository.save(movie);
  }
}
