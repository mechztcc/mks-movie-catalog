import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { CreateUserService } from './services/create-user/create-user.service';
import { Movie } from '../movies/entities/movie.entity';

@Module({
  controllers: [UsersController],
  providers: [CreateUserService],
  imports: [TypeOrmModule.forFeature([User, Movie])],
})
export class UsersModule {}
