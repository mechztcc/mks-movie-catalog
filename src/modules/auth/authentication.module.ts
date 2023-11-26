import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { CreateSessionService } from './services/create-session/create-session.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [CreateSessionService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
})
export class Auth {}
