import { Router } from 'express'
import SessionController from '../controllers/SessionController'

const sessionRouter = Router()

const sessionController = new SessionController()
sessionRouter.post('/login', sessionController.create)
sessionRouter.get('/authenticate', sessionController.show)

export default sessionRouter
