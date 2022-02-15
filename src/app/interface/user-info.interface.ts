export interface IUserInfoInterface {
  name: string,
  surname: string,
  email: string,
  username: string,
  avatar?: string
}
export interface IUserInfoInterfaceResponse {
  data: IUserInfoInterface
}
