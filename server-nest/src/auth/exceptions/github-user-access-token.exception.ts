import { HttpException, HttpStatus } from '@nestjs/common'

export class GithubUserAccessTokenException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED)
    this.name = 'GithubUserAccessTokenException'
  }
}
