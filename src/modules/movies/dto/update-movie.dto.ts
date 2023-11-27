import { IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  id: number;

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
