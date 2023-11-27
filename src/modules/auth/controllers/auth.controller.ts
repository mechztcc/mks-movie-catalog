import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateSessionDto } from '../dto/create-session.dto';
import { CreateSessionService } from '../services/create-session/create-session.service';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly createSessionService: CreateSessionService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Login has made with success',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials, login error' })
  async create(@Body() payload: CreateSessionDto) {
    return await this.createSessionService.execute(payload);
  }
}
