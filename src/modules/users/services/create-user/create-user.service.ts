import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute({ email, name, password }: CreateUserDto): Promise<any> {
    const user = this.usersRepository.create({ email, name, password });
    return await this.usersRepository.save(user);
  }
}
