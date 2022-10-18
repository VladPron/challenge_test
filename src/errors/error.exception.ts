import { HttpException } from '@nestjs/common';

export class DuplicateUniqueException extends HttpException {
  constructor() {
    super('Offer already exist', 409);
  }
}
