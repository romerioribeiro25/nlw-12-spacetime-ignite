import { APP_FILTER } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { GithubAccessTokenExceptionFilter } from './filters/github-access-token-exception.filter'
import { jwtConstants } from './constants/jwt.constant'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_FILTER,
      useClass: GithubAccessTokenExceptionFilter,
    },
  ],
})
export class AuthModule {}
