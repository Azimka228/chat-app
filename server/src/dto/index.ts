export { SignInDto } from './sign-in'
export { SignUpDto } from './sign-up'
export { MessageUserIdDto, MessageDialogIdDto } from './message'

export interface SignIn {
  nickName: string
  password: string
}

export interface SignUp {
  nickName: string
  email: string
  password: string
}
