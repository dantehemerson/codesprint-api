import { CreateCategoryByTitleService } from '@modules/categories/application/services/create-categories.service';
import { CreateCategoryDto } from '@modules/categories/domain/dto/create-category.dto';
import { HttpStatus } from '@shared/enums/http-status.enum';
import { Body, HttpCode, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';
import { Category } from '@modules/categories/infra/persistence/typeorm/entities/category.entity';
import { CreateCategoryService } from '@modules/categories/application/services/create-category.service';

@JsonController('/categories')
export default class CategoriesController {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateCategoryDto): Promise<Category> {
    const { title, parent_id } = body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      title,
      parent_id,
    });

    return category;
  }
}
