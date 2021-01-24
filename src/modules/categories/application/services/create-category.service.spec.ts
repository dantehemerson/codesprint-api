import { CreateCategoryService } from './create-category.service';
import { FakeCategoriesRepository } from './__mocks__/fake-categories.repository';

describe('kals', () => {
  let service: CreateCategoryService;
  let categoryRepository: FakeCategoriesRepository;

  beforeAll(() => {
    categoryRepository = new FakeCategoriesRepository();
    service = new CreateCategoryService(categoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
