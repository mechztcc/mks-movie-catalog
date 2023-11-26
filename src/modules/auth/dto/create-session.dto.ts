import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
