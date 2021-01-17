export default interface CreateUserDTO {
  id: string
  name: string
  email: string
  old_password?: string
  password?: string
}
