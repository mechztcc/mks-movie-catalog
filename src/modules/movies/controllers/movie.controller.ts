import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { CreateMovieService } from '../services/create-movie/create-movie.service';
import { IndexMoviesService } from '../services/index-movies/index-movies.service';
import { FindByUserService } from '../services/find-by-user/find-by-user.service';
import { DeleteMovieService } from '../services/delete-movie/delete-movie.service';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly createMovieService: CreateMovieService,
    private readonly indexMoviesService: IndexMoviesService,
    private readonly findByUserService: FindByUserService,
    private readonly deleteMovieService: DeleteMovieService,
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

  @Delete('/:id')
  @UseInterceptors(AuthorizationInterceptor)
  async delete(@Headers() headers, @Param('id') id: string) {
    const { user } = headers;
    return await this.deleteMovieService.execute({
      movieId: Number(id),
      userId: Number(user.id),
    });
  }

  @Get('me')
  @UseInterceptors(AuthorizationInterceptor)
  async findByUser(@Headers() headers) {
    const { id } = headers.user;
    return await this.findByUserService.execute(id);
  }
}
