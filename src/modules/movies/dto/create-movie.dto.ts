import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  release: string;

  @IsNotEmpty()
  duration: string;
}
