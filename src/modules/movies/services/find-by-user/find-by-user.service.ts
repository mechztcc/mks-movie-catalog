import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../entities/movie.entity';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class FindByUserService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(userId: number): Promise<any> {
    const userExists = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('Provided user has not found.');
    }

    const movies = await this.moviesRepository.find({
      where: { user: { id: userId } },
    });

    return movies;
  }
}
