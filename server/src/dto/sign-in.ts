import { IsString, MinLength } from 'class-validator'

class SignInDto {
  @IsString()
  @MinLength(1)
  public nickName: string = ''

  @IsString()
  @MinLength(1)
  public password: string = ''
}
export default SignInDto
