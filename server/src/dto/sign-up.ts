import { IsString, MinLength } from 'class-validator'

class SignUpDto {
  @IsString()
  @MinLength(1)
  public nickName: string = ''

  @IsString()
  @MinLength(1)
  public email: string = ''

  @IsString()
  @MinLength(1)
  public password: string = ''
}
export default SignUpDto
