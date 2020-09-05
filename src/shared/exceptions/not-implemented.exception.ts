import { HttpStatus } from '../enums/http-status.enum';
import { HttpException } from './http.exception';

export class NotImplementedException extends HttpException {
	constructor(
		objectOrError?: string | object | any,
		description = 'Not Implemented',
	) {
		super(
			HttpException.createBody(
				objectOrError,
				description,
				HttpStatus.NOT_IMPLEMENTED,
			),
			HttpStatus.NOT_IMPLEMENTED,
		);
	}
}
