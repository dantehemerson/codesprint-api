import CreateCategoryService from '@modules/categories/application/services/create-category.service';
import { CreateCategoryDto } from '@modules/categories/domain/dto/create-category.dto';
import { HttpStatus } from '@shared/enums/http-status.enum';
import { Body, HttpCode, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';

@JsonController('/categories')
export default class CategoriesController {
	@HttpCode(HttpStatus.CREATED)
	@Post()
	public async create(@Body() body: CreateCategoryDto): Promise<any> {
		const { title, parent_id } = body;

		const createCategory = container.resolve(CreateCategoryService);

		const category = await createCategory.execute({
			title,
			parent_id,
		});

		return category
	}
}
