import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
