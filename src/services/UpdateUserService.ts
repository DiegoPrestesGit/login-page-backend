import { inject, injectable } from 'tsyringe'

import IUserRepository from '../repositories/models/IUsersRepository'
import UpdateUserDTO from '../dtos/UpdateUserDTO'
import AppError from '../errors/AppError'
import HashConfig from '../config/CryptographyConfig'
import ShowUserDTO from 'dtos/ShowUserDTO'

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
    old_password,
    password
  }: UpdateUserDTO): Promise<ShowUserDTO> {
    const user = await this.usersRepository.findById(id)
    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('The user cannot be found')
    }

    if (userWithEmail && userWithEmail.id !== user.id) {
      throw new AppError('Sorry, email already taken')
    }

    if (password && !old_password) {
      throw new AppError('Inform the old password to continue')
    }

    const hashConfig = new HashConfig()
    if (password && old_password) {
      const checkOldPassword = await hashConfig.compareHash(
        old_password,
        user.password
      )

      if (!checkOldPassword) {
        throw new AppError('The old password does not match')
      }

      const hashedOne = await hashConfig.generateHash(password)
      user.name = name
      user.email = email
      user.password = hashedOne
    } else {
      user.name = name
      user.email = email
    }

    await this.usersRepository.save(user)

    const showUser: ShowUserDTO = {
      id,
      name,
      email
    }

    return showUser
  }
}
