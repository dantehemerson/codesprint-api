import { HttpStatus } from '../enums/http-status.enum';
import { HttpError } from 'routing-controllers';

export class ConflictError extends HttpError {
	name = 'Conflict'

	constructor(message?: string) {
		super(HttpStatus.CONFLICT, message);
		Object.setPrototypeOf(this, ConflictError.prototype);
	}
}
