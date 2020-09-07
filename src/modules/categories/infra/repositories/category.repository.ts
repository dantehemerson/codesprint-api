import { getRepository, Repository } from 'typeorm';
import ICategoriesRepository from '@modules/categories/domain/interfaces/category-repository.interface';
import ICreateCategoryDTO from '@modules/categories/domain/dto/create-category.dto';
import Category from '@modules/categories/infra/persistence/typeorm/entities/Category';

class CategoriesRepository implements ICategoriesRepository {
	private ormRepository: Repository<Category>;

	constructor() {
		this.ormRepository = getRepository(Category);
	}

	async findById(id: string): Promise<Category | undefined> {
		const category = await this.ormRepository.findOne(id);

		return category;
	}

	async findByTitle(title: string): Promise<Category | undefined> {
		const category = await this.ormRepository.findOne({ where: { title } });
		return category;
	}

	async create(categoryData: ICreateCategoryDTO): Promise<Category> {
		const category = await this.ormRepository.create(categoryData);
		return this.save(category);
	}

	async save(category: Category): Promise<Category> {
		return this.ormRepository.save(category);
	}
}

export default CategoriesRepository;
