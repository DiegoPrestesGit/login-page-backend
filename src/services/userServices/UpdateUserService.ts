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

  public async execute({ id, name, email, password }: UserDTO): Promise<User> {
    const user = this.usersRepository.findById(id)
  }
}
