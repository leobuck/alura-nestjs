import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class FiltroDeExcecaoHttp implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception);

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse<Response>();

    const status = exception.getStatus();
    const body = exception.getResponse();

    resposta.status(status).json(body);
  }
}
