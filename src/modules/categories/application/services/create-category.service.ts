import { CreateCategoryDto } from '@modules/categories/domain/dto/create-category.dto';
import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { Category } from '@modules/categories/infra/persistence/typeorm/entities/Category';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCategoryService {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute({ title, parent_id }: CreateCategoryDto): Promise<Category> {
		const checkCategoryExists = await this.categoriesRepository.findByTitle(
			title,
		);

		if (checkCategoryExists) {
			throw new ConflictException(
				`An category with the same title ${title} already exists.`,
			);
		}
		const category = await this.categoriesRepository.create({
			title,
			parent_id,
		});

		return category;
	}
}
