import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    console.log(exception)
    const exceptionRes: any = exception.getResponse();
    let {
      error,
      message,
    } = exceptionRes;
    if(status === 401) {
      message = '身份过期，请重新登录'
    }
    response.status(200).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      msg: message,
    });
  }
}