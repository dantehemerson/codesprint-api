import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
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
  @IsUUID('all', { each: true })
  categories: string[];
}
