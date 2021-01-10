import UserModel from '../../database/entities/User'
import UserRepository from '../../repositories/FakeUserRepository'

export default class {
  public async execute(userRepository: UserRepository): Promise<UserModel[]> {
    const allUsers = await userRepository.readAllUsers()

    return allUsers
  }
}
