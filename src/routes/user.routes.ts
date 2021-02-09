import { Router } from 'express'
import ensureAuthenticated from '../middlewares/ensureAuthentication'
import UserController from '../controllers/UserController'

const userRouter = Router()

const userController = new UserController()

userRouter.get('/:id', ensureAuthenticated, userController.show)
userRouter.post('/', userController.create)
userRouter.put('/:id', ensureAuthenticated, userController.update)

export default userRouter
