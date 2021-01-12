import User from '../../database/entities/User'
import IUserRepository from '../../repositories/models/IUsersRepository'
import UserDTO from '../../dtos/UserDTO'
import AppError from '../../errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class {
  constructor(
    @inject('IUsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute(
    { id, name, email, password }: UserDTO
  ): Promise<User> {
    const selectedUser = this.usersRepository.

    if (selectedUser) {
      const selectedIndex = this.usersRepository.indexOf(selectedUser)
      const user = new User()
      this.usersRepository = user

      return user
    } else {
      throw new AppError('Cannot find the user by this ID.')
    }
  }
}
