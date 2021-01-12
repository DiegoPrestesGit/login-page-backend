import 'reflect-metadata'
import { Request, Response } from 'express'

import CreateUserService from '../services/userServices/CreateUserService'
import UserListService from '../services/userServices/UserListService'
import UpdateUserService from '../services/userServices/UpdateUserService'
import UserDeleteService from '../services/userServices/UserDeleteService'
import UserRepository from '../repositories/FakeUserRepository'
import { container } from 'tsyringe'

const userRepository = new UserRepository()

export default class UserController {
  public async index(_: Request, response: Response): Promise<Response> {
    const userList = new UserListService()

    const allUsers = await userList.execute(userRepository)

    return response.json(allUsers)
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

  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params

    const userDelete = new UserDeleteService()

    await userDelete.execute(userRepository, id)

    response.status(200).json()
  }
}
