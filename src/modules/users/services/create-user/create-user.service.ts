import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute({ email, name, password }: CreateUserDto): Promise<any> {
    console.log(email);

    const userExists = await this.usersRepository.findOne({ where: { email } });
    if (userExists) {
      throw new BadRequestException('Provided email is already in use.');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      name,
      password: hashedPass,
    });

    await this.usersRepository.save(user);

    return {
      ...user,
      password: null,
    };
  }
}
