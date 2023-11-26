import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  release: number;

  @IsNotEmpty()
  duration: string;
}
