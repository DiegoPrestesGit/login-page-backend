import { uuid } from 'uuidv4'
import IUserRepository from '../../src/repositories/models/IUsersRepository'
import CreateUserDTO from '../../src/dtos/CreateUserDTO'
import User from '../../src/database/entities/User'

export default class UserRepository implements IUserRepository {
  private users: User[] = []

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, { id: uuid() }, userData)
    this.users.push(user)
    return user
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(IndexUser => IndexUser.id === user.id)

    this.users[index] = user

    return user
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)
    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)
    return user
  }
}
