import { verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import authConfig from '../config/authConfig'

export default class AuthorizeUserService {
  public async execute(token: string) {
    try {
      const verification = verify(token, authConfig.secret, (err, decoded) => {
        console.log(decoded)
        if (!decoded) {
          throw err
            ? new JsonWebTokenError(err.message)
            : new JsonWebTokenError('Invalid JWT')
        }
        return decoded
      })

      return verification
    } catch (err) {
      return err
    }
  }
}
