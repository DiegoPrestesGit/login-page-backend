import { verify } from 'jsonwebtoken'

export default class AuthorizeUserService {
  public execute(token: string) {
    try {
      // this service needs some implementations
      const verification = verify(token, '', (err, decoded) => {
        console.log(err, decoded)
      })
      console.log(verification)

      return verification
    } catch (err) {}
  }
}
