import { Injectable } from '@nestjs/common'
import { CreateRegisterDto } from './dto/create-register.dto'

@Injectable()
export class AuthService {
  create(createRegiterDto: CreateRegisterDto) {
    console.log(createRegiterDto)
    return 'This action adds a new auth -- teste'
  }
}
