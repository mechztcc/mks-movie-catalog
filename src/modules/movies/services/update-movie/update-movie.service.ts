import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Movie } from '../../entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { UpdateMovieDto } from '../../dto/update-movie.dto';

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

    return await this.moviesRepository.save(movieExists);
  }
}
