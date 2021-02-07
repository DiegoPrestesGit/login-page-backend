import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import IUsersRepository from '../repositories/models/IUsersRepository'
import AppError from '../errors/AppError'
import ShowUserDTO from 'dtos/ShowUserDTO'

@injectable()
export default class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(id: string): Promise<ShowUserDTO> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const { name, email } = user
    const showUser: ShowUserDTO = {
      id,
      name,
      email
    }

    return showUser
  }
}
