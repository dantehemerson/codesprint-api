import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsOptional()
  @IsUUID()
  @IsString()
  parent_id?: string;
}
