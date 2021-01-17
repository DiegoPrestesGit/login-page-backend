import User from '../../database/entities/User'

interface UserDTO {
  name: string
  email: string
  password: string
}

export default interface IUserRepository {
  create(data: UserDTO): Promise<User>
  save(user: User): Promise<User>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
}
