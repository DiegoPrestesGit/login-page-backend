import 'reflect-metadata'
import { Request, Response } from 'express'
import CreateUserService from '../services/userServices/CreateUserService'
import ShowUserService from '../services/userServices/ShowUserService'
import UpdateUserService from '../services/userServices/UpdateUserService'
import UserRepository from '../repositories/fakes/FakeUserRepository'
import { container } from 'tsyringe'

const userRepository = new UserRepository()

export default class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getUser = container.resolve(ShowUserService)
    const user = await getUser.execute(id)

    return response.json(user)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)
    const user = await createUser.execute({ name, email, password })

    return response.json(user)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, password } = request.body
    const updateUser = container.resolve(UpdateUserService)

    const user = await updateUser.execute({ id, name, email, password })

    return response.json(user)
  }
}
