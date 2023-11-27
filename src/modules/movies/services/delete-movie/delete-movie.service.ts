import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../../entities/movie.entity';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

interface IRequest {
  movieId: number;
  userId: number;
}

@Injectable()
export class DeleteMovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async execute({ movieId, userId }: IRequest): Promise<any> {
    const movieExists = await this.moviesRepository.findOne({
      where: { id: movieId },
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

    await this.moviesRepository.delete({ id: movieId });

    await this.cacheService.reset();

    return {
      message: 'Movie deleted with success',
    };
  }
}
