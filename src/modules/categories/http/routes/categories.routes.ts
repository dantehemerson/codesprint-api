import { Router } from 'express';

import CategoriesController from '@modules/categories/http/controllers/categories.controller';

const categoriesController = new CategoriesController();

export const categoriesRouter = Router();

categoriesRouter.post('/', categoriesController.create);
/** test */
categoriesRouter.get('/', (req, res) => {
	res.json([]);
});
