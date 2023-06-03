import { IsString } from 'class-validator'

export class GithubLoginOauthDto {
  @IsString()
  access_token: string
}
