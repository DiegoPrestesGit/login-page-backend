import AppError from '../errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import ShowUserService from './ShowUserService'

let fakeUsersRepository: FakeUsersRepository
let showUserService: ShowUserService
let createUserService: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showUserService = new ShowUserService(fakeUsersRepository)
    createUserService = new CreateUserService(fakeUsersRepository)
  })

  it('should be able to show the data of an user', async () => {
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const profile = await showUserService.execute(user.id)
    expect(profile.name).toBe('Johnny Cash')
    expect(profile.email).toBe('johnnycasher@gloiro.com')
  })

  it('should not be able to show an user that does not exist', async () => {
    await expect(
      showUserService.execute('id-that-doesnt-exits')
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not return the user password', async () => {
    const user = await createUserService.execute({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const showUser = await showUserService.execute(user.id)

    expect(showUser.password).toBeUndefined()
  })
})
