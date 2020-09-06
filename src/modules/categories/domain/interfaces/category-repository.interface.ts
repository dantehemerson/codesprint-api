import Category from '@modules/categories/infra/persistence/typeorm/entities/Category';
import ICreateUserDTO from '@modules/categories/domain/dto/create-category.dto';

export default interface ICategoriesRepository {
	findById(id: string): Promise<Category | undefined>;
	findByTitle(title: string): Promise<Category | undefined>;
	create(data: ICreateUserDTO): Promise<Category>;
	save(category: Category): Promise<Category>;
}
