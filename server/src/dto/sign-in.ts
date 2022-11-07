import { IsString, MinLength } from 'class-validator'

export class SignInDto {
  @IsString()
  @MinLength(1)
  public nickName: string = ''

  @IsString()
  @MinLength(1)
  public password: string = ''
}
