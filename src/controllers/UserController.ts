import 'reflect-metadata'
import { Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'
import ShowUserService from '../services/ShowUserService'
import UpdateUserService from '../services/UpdateUserService'
import { container } from 'tsyringe'

export default class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const getUser = container.resolve(ShowUserService)
      const user = await getUser.execute(id)
      console.log(user)
      return response.json(user)
    } catch (err) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
      })
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body
      const createUser = container.resolve(CreateUserService)
      const user = await createUser.execute({ name, email, password })

      return response.status(201).json(user)
    } catch (err) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
      })
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const { name, email, password } = request.body
      const updateUser = container.resolve(UpdateUserService)

      const user = await updateUser.execute({ id, name, email, password })

      return response.json(user)
    } catch (err) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
      })
    }
  }
}
