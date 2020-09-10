import { CreateCategoryDto } from '@modules/categories/domain/dto/create-category.dto';
import Category from '@modules/categories/infra/persistence/typeorm/entities/Category';

export default interface ICategoriesRepository {
	findById(id: string): Promise<Category | undefined>;
	findByTitle(title: string): Promise<Category | undefined>;
	create(data: CreateCategoryDto): Promise<Category>;
	save(category: Category): Promise<Category>;
}
