import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import User from '../database/entities/User'
import IUsersRepository from '../repositories/models/IUsersRepository'
import AppError from '../errors/AppError'
import HashConfig from '../config/CryptographyConfig'

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

  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userEmail = await this.usersRepository.findByEmail(email)
    if (userEmail) {
      throw new AppError('e-mail already taken')
    }

    const hashConfig = new HashConfig()
    const hashedOne = await hashConfig.generateHash(password)

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedOne
    })

    return user
  }
}
