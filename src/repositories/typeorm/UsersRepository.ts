import User from '../../database/entities/User'
import { getRepository, Repository } from 'typeorm'
import IUserRepository from '../models/IUsersRepository'
import UserDTO from '../../dtos/CreateUserDTO'
import AppError from '../../errors/AppError'

export default class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)
    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })
    return user
  }

  async create(userData: UserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    await this.ormRepository.save(user)
    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}
