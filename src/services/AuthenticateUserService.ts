import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import IUserRepository from '../repositories/models/IUsersRepository'
import AppError from '../errors/AppError'
import CryptoConfig from '../config/CryptographyConfig'
import authConfig from '../config/authConfig'
import ShowUserDTO from '../dtos/ShowUserDTO'

interface RequestDTO {
  email: string
  password: string
}

interface ResponseDTO {
  showUser: ShowUserDTO
  token: string
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('incorrect email/password combination', 401)
    }

    const crypto = new CryptoConfig()
    const passwordMatch = await crypto.compareHash(password, user.password)

    if (!passwordMatch) {
      throw new AppError('incorrect email/password', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    const { id, name } = user

    const showUser: ShowUserDTO = {
      id,
      name,
      email
    }

    return { showUser, token }
  }
}
