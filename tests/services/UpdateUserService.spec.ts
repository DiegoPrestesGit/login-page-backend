import AppError from '../../src/errors/AppError'
import FakeUsersRepository from '../mocks/FakeUserRepository'
import CreateUserService from '../../src/services/CreateUserService'
import UpdateUserService from '../../src/services/UpdateUserService'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService
let updateUserService: UpdateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUserService = new CreateUserService(fakeUsersRepository)
    updateUserService = new UpdateUserService(fakeUsersRepository)
  })

  it('should be able to update a existing user with password', async () => {
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

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
  })

  it('should be able to update the user without alter the password', async () => {
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const userUpdated = await updateUserService.execute({
      id: user.id,
      name: 'Update Johnny',
      email: 'john_the_revelator@gloiro.com'
    })

    expect(userUpdated.id).toBe(user.id)
    expect(userUpdated.name).toBe('Update Johnny')
    expect(userUpdated.email).toBe('john_the_revelator@gloiro.com')
  })

  it('should not update a user that does not exist', async () => {
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
    await createUserService.execute({
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

  it('should not be able to update the user with the wrong password', async () => {
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    await expect(
      updateUserService.execute({
        id: user.id,
        name: 'Update Johnny',
        email: 'john_the_revelator@gloiro.com',
        old_password: '54345',
        password: 'outPassword'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the user with password and no old password', async () => {
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    await expect(
      updateUserService.execute({
        id: user.id,
        name: 'Update Johnny',
        email: 'john_the_revelator@gloiro.com',
        password: 'outPassword'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
