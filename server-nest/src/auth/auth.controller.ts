import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateRegisterDto } from './dto/create-register.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() { code }: CreateRegisterDto) {
    const accessToken = await this.authService.createGithubAccessToken(code)

    const user = await this.authService.getGithubUserWithAccessToken(
      accessToken,
    )

    return user
  }
}
