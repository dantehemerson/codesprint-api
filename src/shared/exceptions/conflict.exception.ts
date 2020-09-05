import { HttpStatus } from '../enums/http-status.enum';
import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
	constructor(objectOrError?: string | object | any, description = 'Conflict') {
		super(
			HttpException.createBody(objectOrError, description, HttpStatus.CONFLICT),
			HttpStatus.CONFLICT,
		);
	}
}
