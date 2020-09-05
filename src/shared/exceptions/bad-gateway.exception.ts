import { HttpStatus } from '../enums/http-status.enum';
import { HttpException } from './http.exception';

export class BadGatewayException extends HttpException {
	constructor(
		objectOrError?: string | object | any,
		description = 'Bad Gateway',
	) {
		super(
			HttpException.createBody(
				objectOrError,
				description,
				HttpStatus.BAD_GATEWAY,
			),
			HttpStatus.BAD_GATEWAY,
		);
	}
}
