import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import AuthenticateUser from '../services/AuthenticateUserService'
import AuthorizeUser from '../services/AuthorizeUserService'
import AppError from '../errors/AppError'

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body

      const createSession = container.resolve(AuthenticateUser)
      const session = await createSession.execute({ email, password })

      return response.json(session)
    } catch (err) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
      })
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { authorization } = request.headers

      if (!authorization) {
        throw new AppError('Your token has inspired', 401)
      }
      const [_, token] = authorization?.split(' ')

      const authorizeUser = container.resolve(AuthorizeUser)
      const authorizer = await authorizeUser.execute(token)

      return response.json(authorizer)
    } catch (err) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
      })
    }
  }
}
