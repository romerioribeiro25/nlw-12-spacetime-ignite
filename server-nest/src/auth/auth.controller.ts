import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateRegisterDto } from './dto/create-register.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.authService.create(createRegisterDto)
  }
}
