import { IsString, IsNotEmpty } from 'class-validator'

export class CreateGithubAccessTokenDto {
  @IsString()
  @IsNotEmpty()
  code: string
}
