/** TODO
 * Should be able to create a user
 * Should not be able create a user with same email
 */

import AppError from '../../errors/AppError'
import FakeUsersRepository from '../../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUserService = new CreateUserService(fakeUsersRepository)
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    console.log(fakeUsersRepository.findByEmail('johnnycasher@gloiro.com'))
    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })
    console.log(fakeUsersRepository.findByEmail('johnnycasher@gloiro.com'))
    await expect(
      createUserService.execute({
        name: 'Johnny Cash',
        email: 'johnnycasher@gloiro.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
