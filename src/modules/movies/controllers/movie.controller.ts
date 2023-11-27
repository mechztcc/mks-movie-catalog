import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('movies')
@ApiBearerAuth()
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
  @ApiCreatedResponse({ description: 'Movie has been created' })
  @UseInterceptors(AuthorizationInterceptor)
  async store(@Body() payload: CreateMovieDto, @Headers() headers) {
    const { id } = headers.user;

    return await this.createMovieService.execute({
      data: payload,
      userId: Number(id),
    });
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The request has succedeed' })
  @UseInterceptors(AuthorizationInterceptor)
  async index(@Headers() headers, @Query() query) {
    const params = {
      page: query['page'] ?? 1,
    };
    return await this.indexMoviesService.execute({
      page: params.page,
    });
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The record identifier',
  })
  @ApiResponse({ status: 200, description: 'The request has succedeed' })
  @ApiNotFoundResponse({
    description: 'Provided movie, or Provided user has not found.',
  })
  @ApiUnauthorizedResponse({
    description:
      'The logged in user does not have permission to delete this record',
  })
  @ApiInternalServerErrorResponse({
    description: 'The provided movieId, its invalid',
  })
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
  @ApiNotFoundResponse({ description: 'The provided movie id has not found' })
  @ApiNotFoundResponse({ description: 'The provided user has not found' })
  @ApiUnauthorizedResponse({
    description: 'Only the owner of movie, can update records',
  })
  @ApiResponse({ status: 200, description: 'The record has been updated' })
  async update(@Headers() headers, @Body() payload: UpdateMovieDto) {
    const { user } = headers;
    return await this.updateMovieService.execute({
      data: payload,
      userId: Number(user.id),
    });
  }

  @Get('me')
  @ApiNotFoundResponse({ description: 'The provided user has not found' })
  @ApiResponse({ status: 200, description: 'All records are listed by owner' })
  @UseInterceptors(AuthorizationInterceptor)
  async findByUser(@Headers() headers) {
    const { id } = headers.user;
    return await this.findByUserService.execute(id);
  }
}
