import { HttpException, HttpStatus } from '@nestjs/common'

export class GithubAccessTokenException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
    this.name = 'GithubAccessTokenException'
  }
}
