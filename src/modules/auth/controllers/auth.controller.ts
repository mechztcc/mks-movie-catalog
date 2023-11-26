import { Body, Controller, Post } from '@nestjs/common';
import { CreateSessionDto } from '../dto/create-session.dto';
import { CreateSessionService } from '../services/create-session/create-session.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly createSessionService: CreateSessionService) {}

  @Post()
  async create(@Body() payload: CreateSessionDto) {
    return await this.createSessionService.execute(payload);
  }
}
