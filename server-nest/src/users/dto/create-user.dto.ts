import { IsString, IsNumber, IsUrl } from 'class-validator'

import { OmitType } from '@nestjs/mapped-types'

import { GithubUserDto } from 'src/auth/dto/github-user.dto'

export class CreateUserDto extends OmitType(GithubUserDto, [
  'id',
  'avatar_url',
] as const) {
  @IsString()
  @IsUrl()
  avatarUrl: string

  @IsNumber()
  githubId: number
}
