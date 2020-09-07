import ICreateCategoryDTO from '@modules/categories/domain/dto/create-category.dto';
import ICategoryRepository from '@modules/categories/domain/interfaces/category-repository.interface';
import { inject, injectable } from 'tsyringe';
import { ConflictException } from '@shared/exceptions/conflict.exception';
import Category from '@modules/categories/infra/persistence/typeorm/entities/Category';

@injectable()
export default class CreateCategoryService {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoryRepository,
	) {}

	async execute({ title, parent_id }: ICreateCategoryDTO): Promise<Category> {
		console.log('ok: create category service');

		const checkCategoryExists = await this.categoriesRepository.findByTitle(
			title,
		);

		console.log('ok: query success');

		if (checkCategoryExists) {
			throw new ConflictException(
				`An category with the same title ${title} already exists.`,
			);
		}
		console.log(parent_id);
		const category = await this.categoriesRepository.create({
			title,
			parent_id,
		});

		return category;
	}
}
