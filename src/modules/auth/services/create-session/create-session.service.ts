import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../../dto/create-session.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreateSessionService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: CreateSessionDto): Promise<any> {
    const userExists = await this.usersRepository.findOne({ where: { email } });
    if (!userExists) {
      throw new UnauthorizedException('Incorrect email/password combination.');
    }

    const passwordConfirmed = await compare(password, userExists.password);
    if (!passwordConfirmed) {
      throw new UnauthorizedException('Incorrect email/password combination.');
    }

    const payload = { id: userExists.id, email: userExists.email };

    return {
      user: {
        name: userExists.name,
        email: userExists.email,
        token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
