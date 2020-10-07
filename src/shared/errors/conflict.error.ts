import { HttpError } from 'routing-controllers';
import { HttpStatus } from '../enums/http-status.enum';

export class ConflictError extends HttpError {
  name = 'Conflict';

  constructor(message?: string) {
    super(HttpStatus.CONFLICT, message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
