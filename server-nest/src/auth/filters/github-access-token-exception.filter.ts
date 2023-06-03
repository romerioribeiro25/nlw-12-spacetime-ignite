import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { GithubAccessTokenException } from '../exceptions/github-access-token.exception'

@Catch(GithubAccessTokenException)
export class GithubAccessTokenExceptionFilter implements ExceptionFilter {
  catch(exception: GithubAccessTokenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      error: 'Internal Server Error',
    })
  }
}
