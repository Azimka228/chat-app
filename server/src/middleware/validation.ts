import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'
import HttpException from '../exceptions/http/http-exception'
import { ClassConstructor } from 'class-transformer/types/interfaces'

function validationMiddleware<T>(type: ClassConstructor<T>): RequestHandler {
  return (req, res, next) => {
    void validate(plainToClass(type, req.body) as object).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) =>
            error?.constraints !== undefined ? Object.values(error.constraints) : null,
          )
          .join(', ')
        next(new HttpException(400, message))
      } else {
        next()
      }
    })
  }
}

export default validationMiddleware
