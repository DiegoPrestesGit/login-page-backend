import { Router } from 'express'
import userRouter from './user.routes'
import sessionRouter from './session.routes'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/', sessionRouter)

export default routes
