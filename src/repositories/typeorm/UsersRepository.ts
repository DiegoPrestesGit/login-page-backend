import User from '../../database/entities/User'
import { getRepository, Repository } from 'typeorm'
import IUserRepository from '../models/IUsersRepository'
import UserDTO from '../../dtos/UserDTO'
import AppError from '../../errors/AppError'

export default class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  async create(userData: UserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    await this.ormRepository.save(user)
    return user
  }

  readAllUsers(): Promise<User[]> {
    throw new AppError('Method not implemented.')
  }

  updateUser(userData: UserDTO): Promise<User> {
    throw new AppError('Method not implemented.')
  }

  deleteUser(id: string): void {
    throw new AppError('Method not implemented.')
  }
}
