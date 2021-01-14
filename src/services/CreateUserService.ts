import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import User from '../database/entities/User'
import IUsersRepository from '../repositories/models/IUsersRepository'
import AppError from '../errors/AppError'

interface RequestDTO {
  name: string
  email: string
  password: string
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(userData: RequestDTO): Promise<User> {
    const userEmail = await this.usersRepository.findByEmail(userData.email)
    if (userEmail) {
      throw new AppError('e-mail already taken')
    }

    const user = this.usersRepository.create(userData)
    return user
  }
}
