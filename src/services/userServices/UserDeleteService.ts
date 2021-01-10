import UserRepository from '../../repositories/FakeUserRepository'

export default class {
  public async execute(
    userRepository: UserRepository,
    id: string
  ): Promise<void> {
    await userRepository.deleteUser(id)
  }
}
