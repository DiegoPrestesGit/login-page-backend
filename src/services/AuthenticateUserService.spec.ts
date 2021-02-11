import AppError from '../errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from '../services/CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let authenticateUser: AuthenticateUserService
let createUser: CreateUserService

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    authenticateUser = new AuthenticateUserService(fakeUsersRepository)
    createUser = new CreateUserService(fakeUsersRepository)
  })

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Johnny Dogs',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.showUser.id).toEqual(user.id)
    expect(response.showUser.email).toEqual(user.email)
    expect(response.showUser.name).toEqual(user.name)
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johnnycasher@gloiro.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    await expect(
      authenticateUser.execute({
        email: 'johnnycasher@gloiro.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
