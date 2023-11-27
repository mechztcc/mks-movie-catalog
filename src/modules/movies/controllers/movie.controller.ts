import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { CreateMovieService } from '../services/create-movie/create-movie.service';
import { IndexMoviesService } from '../services/index-movies/index-movies.service';
import { FindByUserService } from '../services/find-by-user/find-by-user.service';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly createMovieService: CreateMovieService,
    private readonly indexMoviesService: IndexMoviesService,
    private readonly findByUserService: FindByUserService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async store(@Body() payload: CreateMovieDto, @Headers() headers) {
    const { id } = headers.user;

    return await this.createMovieService.execute({
      data: payload,
      userId: Number(id),
    });
  }

  @Get()
  @UseInterceptors(AuthorizationInterceptor)
  async index(@Headers() headers) {
    return await this.indexMoviesService.execute();
  }

  @Get('me')
  @UseInterceptors(AuthorizationInterceptor)
  async findByUser(@Headers() headers) {
    const { id } = headers.user;
    return await this.findByUserService.execute(id);
  }
}
