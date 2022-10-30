import HttpException from './http-exception'

class BadRequestException extends HttpException {
  constructor() {
    super(400, 'bad request')
  }
}

export default BadRequestException
