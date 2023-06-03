import { IsNumber, IsString, IsUrl } from 'class-validator'

export class GithubUserDto {
  @IsNumber()
  id: number

  @IsString()
  login: string

  @IsString()
  name: string

  @IsString()
  @IsUrl()
  avatar_url: string
}
