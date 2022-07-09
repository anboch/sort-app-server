import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse();

    switch (exception.code) {
      case 11000:
        return response.status(400).json({
          message: exception.message,
        });
    }
  }
}
