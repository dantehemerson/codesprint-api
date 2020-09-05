import { NextFunction, Response, Request } from 'express';
import { HttpException, isObject } from '@shared/exceptions/http.exception';

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next_: NextFunction,
) {
	if (!(err instanceof HttpException)) {
		return res.status(500).json({
			status: 'error',
			message: 'Internal server error',
			// Show in local only
			stack: err.stack,
		});
	}

	const response = err.getResponse();
	const message = isObject(response)
		? response
		: {
				statusCode: err.getStatus(),
				message: response,
		  };

	return res.status(err.getStatus()).json(message);
}
