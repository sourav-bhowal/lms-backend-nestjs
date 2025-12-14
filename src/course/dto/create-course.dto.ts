import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString({})
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  level?: string;
}
