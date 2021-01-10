import { inject, injectable } from 'tsyringe'
import UserModel from '../../database/entities/User'
import IUserRepository from '../../repositories/models/IUserRepository'

interface RequestDTO {
  name: string
  email: string
  password: string
}

@injectable()
export default class {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute(userData: RequestDTO): Promise<UserModel> {
    const user = this.usersRepository.create(userData)

    return user
  }
}
