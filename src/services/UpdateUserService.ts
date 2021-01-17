import { inject, injectable } from 'tsyringe'

import User from '../database/entities/User'
import IUserRepository from '../repositories/models/IUsersRepository'
import UpdateUserDTO from '../dtos/UpdateUserDTO'
import AppError from '../errors/AppError'
import HashConfig from '../config/CryptographyConfig'

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({
    id,
    name,
    email,
    password
  }: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(id)
    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('The user cannot be found')
    }

    if (userWithEmail && userWithEmail.id !== user.id) {
      throw new AppError('Sorry, email already taken')
    }

    const hashConfig = new HashConfig()
    const hashedOne = await hashConfig.generateHash(password)
    user.name = name
    user.email = email
    user.password = hashedOne

    return this.usersRepository.save(user)
  }
}
