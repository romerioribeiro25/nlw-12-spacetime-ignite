import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateGithubAccessTokenDto } from './dto/create-github-access-token.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() { code }: CreateGithubAccessTokenDto) {
    const accessToken = await this.authService.createGithubAccessToken(code)

    const user = await this.authService.getGithubUserWithAccessToken(
      accessToken,
    )

    return user
  }
}
