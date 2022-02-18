export interface IUserInfoInterface {
  name: string,
  surname: string,
  email: string,
  username: string,
  avatar?: string,
  _id?: string
}
export interface IUserInfoInterfaceResponse {
  data: IUserInfoInterface
}
