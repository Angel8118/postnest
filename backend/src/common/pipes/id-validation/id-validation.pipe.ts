import { ArgumentMetadata, Injectable, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class IdValidationPipe extends ParseIntPipe  {
  constructor() {
    super({
      errorHttpStatusCode: 400,
      exceptionFactory: (errors) => {
        return new Error('Invalid ID format');
      },
    });
  }
}
