import { IsString, MinLength } from 'class-validator'

export class MessageUserIdDto {
  @IsString()
  @MinLength(1)
  body: string = ''

  @IsString()
  @MinLength(1)
  toId: string = ''
}

export class MessageDialogIdDto {
  @IsString()
  @MinLength(1)
  body: string = ''

  @IsString()
  dialogId: string = ''
}
