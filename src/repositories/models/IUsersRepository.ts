import User from '../../database/entities/User'
import UserDTO from '../../dtos/CreateUserDTO'

export default interface IUserRepository {
  create(data: UserDTO): Promise<User>
  save(user: User): Promise<User>
  readAllUsers(): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  updateUser(data: UserDTO): Promise<User>
  deleteUser(id: string): void
}
