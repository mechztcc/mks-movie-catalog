import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'number',
    description: 'the unique identifier registered, required to find it',
  })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: 'string' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: 'string' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'number',
    description: 'parental rating',
  })
  age: number;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'release year',
    example: '1994',
  })
  release: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: 'string', example: '2h 22 min' })
  duration: string;
}
