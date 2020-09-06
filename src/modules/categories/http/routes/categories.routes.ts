import { Router } from 'express';

import CategoriesController from '@modules/categories/http/controllers/categories.controller';

const categoriesController = new CategoriesController();

export const categoriesRouter = Router();

console.log('ok: categories routes');

categoriesRouter.post('/', categoriesController.create);
/** test */
categoriesRouter.get('/', (req, res) => {
	res.json([]);
});
