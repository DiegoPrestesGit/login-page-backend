import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import User from '../../database/entities/User'
import IUsersRepository from '../../repositories/models/IUsersRepository'
import AppError from '../../errors/AppError'

@injectable()
export default class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }
    return user
  }
}
