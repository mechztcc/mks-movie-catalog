import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { CreateMovieService } from '../services/create-movie/create-movie.service';
import { IndexMoviesService } from '../services/index-movies/index-movies.service';
import { FindByUserService } from '../services/find-by-user/find-by-user.service';
import { DeleteMovieService } from '../services/delete-movie/delete-movie.service';
import { UpdateMovieService } from '../services/update-movie/update-movie.service';
import { UpdateMovieDto } from '../dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly createMovieService: CreateMovieService,
    private readonly indexMoviesService: IndexMoviesService,
    private readonly findByUserService: FindByUserService,
    private readonly deleteMovieService: DeleteMovieService,
    private readonly updateMovieService: UpdateMovieService,
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

  @Put()
  @UseInterceptors(AuthorizationInterceptor)
  async update(@Headers() headers, @Body() payload: UpdateMovieDto) {
    const { user } = headers;
    return await this.updateMovieService.execute({
      data: payload,
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
