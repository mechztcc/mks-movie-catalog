import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created user with success' })
  @ApiBadRequestResponse({ description: 'Email already in use' })
  store(@Body() payload: CreateUserDto) {
    return this.createUserService.execute(payload);
  }
}
