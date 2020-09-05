import { NextFunction, Response, Request } from 'express';
import AppError from '@shared/errors/app.error';

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next_: NextFunction,
) {
	if (err instanceof AppError) {
		return res
			.status(err.statusCode)
			.json({ status: 'error', message: err.message });
	}

	console.error(err);

	return res
		.status(500)
		.json({ status: 'error', message: 'Internal server error' });
}
