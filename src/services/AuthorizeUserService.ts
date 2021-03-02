import { verify } from 'jsonwebtoken'
import authConfig from '../config/authConfig'
import AppError from '../errors/AppError'

export default class AuthorizeUserService {
  public async execute(token: string) {
    try {
      const verification = verify(token, authConfig.secret, (err, decoded) => {
        if (!decoded) {
          throw err
            ? new AppError(err.message, 401)
            : new AppError('Invalid JWT', 401)
        }

        return decoded
      })

      return verification
    } catch (err) {
      return err
    }
  }
}
