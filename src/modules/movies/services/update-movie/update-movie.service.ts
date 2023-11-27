import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Movie } from '../../entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { UpdateMovieDto } from '../../dto/update-movie.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

interface IRequest {
  data: UpdateMovieDto;
  userId: number;
}

@Injectable()
export class UpdateMovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute({ data, userId }: IRequest): Promise<any> {
    const movieExists = await this.moviesRepository.findOne({
      where: { id: data.id },
      relations: { user: true },
    });

    if (!movieExists) {
      throw new NotFoundException('Provided movie has not found.');
    }

    const userExists = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('Provided user has not found.');
    }

    if (movieExists.user.id !== userId) {
      throw new UnauthorizedException(
        'Provided user is not the owner of this movie.',
      );
    }

    movieExists.name = data.name;
    movieExists.age = data.age;
    movieExists.description = data.description;
    movieExists.release = data.release;
    movieExists.duration = data.duration;

    const response = await this.moviesRepository.save(movieExists);
    this.cacheService.reset();
    return response;
  }
}
