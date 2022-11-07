import HttpException from './http-exception'

class NotFoundException extends HttpException {
  constructor() {
    super(404, 'not found')
  }
}

export default NotFoundException
