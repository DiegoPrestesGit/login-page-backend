import { verify } from 'jsonwebtoken'
import authConfig from '../config/authConfig'

export default class AuthorizeUserService {
  public execute(token: string) {
    try {
      // this service needs some implementations
      const verification = verify(token, authConfig.secret)
      return verification
    } catch (err) {}
  }
}
