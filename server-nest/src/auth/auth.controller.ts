import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateGithubAccessTokenDto } from './dto/create-github-access-token.dto'
import { UsersService } from 'src/users/users.service'

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async create(@Body() { code }: CreateGithubAccessTokenDto) {
    const accessToken = await this.authService.createGithubAccessToken(code)

    const githubUser = await this.authService.getGithubUserWithAccessToken(
      accessToken,
    )

    const user = await this.usersService.create(githubUser)

    const token = await this.authService.jwtSignAsync(user)

    return { token }
  }
}
