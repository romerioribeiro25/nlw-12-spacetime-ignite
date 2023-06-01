import { IsString, IsNotEmpty } from 'class-validator'

export class CreateRegisterDto {
  @IsString()
  @IsNotEmpty()
  code: string
}
