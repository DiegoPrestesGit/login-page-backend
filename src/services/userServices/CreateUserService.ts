import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import User from '../../database/entities/User'
import IUsersRepository from '../../repositories/models/IUsersRepository'

interface RequestDTO {
  name: string
  email: string
  password: string
}

@injectable()
export default class {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(userData: RequestDTO): Promise<User> {
    const user = this.usersRepository.create(userData)
    return user
  }
}
