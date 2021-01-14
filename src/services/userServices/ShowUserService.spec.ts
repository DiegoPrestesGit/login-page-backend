/** TODO
 * Should be able to show a user by ID
 * Should not be able to show a user that not exist
 */

import AppError from '../../errors/AppError'
import FakeUsersRepository from '../../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import ShowUserService from './ShowUserService'

let fakeUsersRepository: FakeUsersRepository
let showUserService: ShowUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showUserService = new ShowUserService(fakeUsersRepository)
  })

  it('should be able to show the data of an user', async () => {
    const createUserService = new CreateUserService(fakeUsersRepository)
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const profile = await showUserService.execute(user.id)
    expect(profile.name).toBe('Johnny Cash')
    expect(profile.email).toBe('johnnycasher@gloiro.com')
  })

  it('should not be able to create a new user with same email from another', async () => {
    await expect(
      showUserService.execute('id-that-doesnt-exits')
    ).rejects.toBeInstanceOf(AppError)
  })
})
