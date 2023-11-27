import {
  Body,
  Controller,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { CreateMovieService } from '../services/create-movie/create-movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly createMovieService: CreateMovieService) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async store(@Body() payload: CreateMovieDto, @Headers() headers) {
    const { id } = headers.user;

    return await this.createMovieService.execute({
      data: payload,
      userId: Number(id),
    });
  }
}
