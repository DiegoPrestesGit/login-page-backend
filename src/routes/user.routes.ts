import { Router } from 'express'
import UserController from '../controllers/UserController'

const userRouter = Router()

const userController = new UserController()

userRouter.get('/:id', userController.show)
userRouter.post('/', userController.create)
userRouter.put('/:id', userController.update)

export default userRouter
