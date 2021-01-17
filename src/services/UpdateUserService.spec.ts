/**
 * should be able to update a user without the right password
 * should be able to update a user without password
 * should encrypt the new user password when the changes his password
 * (IN THE FUTURE) should be able to update the user password
 */

import AppError from '../errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import UpdateUserService from './UpdateUserService'
import HashConfig from '../config/CryptographyConfig'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService
let updateUserService: UpdateUserService
let hashConfig: HashConfig

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUserService = new CreateUserService(fakeUsersRepository)
    updateUserService = new UpdateUserService(fakeUsersRepository)
    hashConfig = new HashConfig()
  })

  it('Should be able to update a existing user with password', async () => {
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    console.log(user)

    const outPassword = 'we-are-updating'
    const userUpdated = await updateUserService.execute({
      id: user.id,
      name: 'Update Johnny',
      email: 'john_the_revelator@gloiro.com',
      old_password: '123456',
      password: outPassword
    })

    expect(userUpdated.id).toBe(user.id)
    expect(userUpdated.name).toBe('Update Johnny')
    expect(userUpdated.email).toBe('john_the_revelator@gloiro.com')
    expect(await hashConfig.compareHash(outPassword, user.password)).toBe(true)
  })

  it('Should not update a user that does not exist', async () => {
    expect(
      updateUserService.execute({
        id: 'this-id-does-not-exist',
        name: 'Johnny Cash',
        email: 'johnnycasher@gloiro.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new user with same email from another', async () => {
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const otherUser = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher2@gloiro.com',
      password: '123456'
    })

    await expect(
      updateUserService.execute({
        id: otherUser.id,
        name: 'Johnny Cash',
        email: 'johnnycasher@gloiro.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
