import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception);
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.UNAUTHORIZED) {
      response
        .status(status)
        .send({ message: 'UltraHost: Unauthorized', status: status });
    }
    // handel 401
    if (status === HttpStatus.FORBIDDEN) {
      response
        .status(status)
        .send({ message: 'UltraHost: Forbidden', status: status });
    }
    response
      .status(status)
      .send({ message: 'Something went wrong', status: status });
  }
}
