import { container } from 'tsyringe'

import IUsersRepository from '../repositories/models/IUsersRepository'
import UsersRepository from '../repositories/typeorm/UsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
