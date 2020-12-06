import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  intro: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  bodyMarkdown: string;

  @IsArray()
  @ArrayMaxSize(5, {
    message: 'You can not set more than 5 categories to a challenge',
  })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  categories: string[];
}
