import { APP_FILTER } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { GithubAccessTokenExceptionFilter } from './filters/github-access-token-exception.filter'

@Module({
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
