import User from '../../database/entities/User'
import IUserRepository from '../../repositories/models/IUsersRepository'
import UpdateUserDTO from '../../dtos/UpdateUserDTO'
import AppError from '../../errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class {
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

    user.name = name
    user.email = email
    user.password = password

    return this.usersRepository.save(user)
  }
}
