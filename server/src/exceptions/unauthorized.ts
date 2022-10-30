import HttpException from './http-exception'

class UnauthorizedException extends HttpException{
  constructor() {
    super(401, 'Authentication token missing')
  }
}
export default UnauthorizedException
