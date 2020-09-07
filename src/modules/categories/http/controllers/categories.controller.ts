import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/application/services/create-category.service';

export default class CategoriesController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { title, parent_id } = req.body;

		const createCategory = container.resolve(CreateCategoryService);

		const category = await createCategory.execute({
			title,
			parent_id,
		});

		return res.json(category);
	}
}
