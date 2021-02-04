import 'reflect-metadata'
import { Request, Response } from 'express'

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body

      return response.json('temp')
    } catch (err) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
      })
    }
  }
}
