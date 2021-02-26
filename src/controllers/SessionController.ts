import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import AuthenticateUser from '../services/AuthenticateUserService'

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
      const xqdl = request.headers.authorization
      console.log(xqdl)

      return response.json({})
    } catch (err) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
      })
    }
  }
}
