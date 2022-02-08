export interface IUserInfoInterface {
  name: string,
  email: string,
  username: string,
  avatar?: string
}
export interface IUserInfoInterfaceResponse {
  data: IUserInfoInterface
}
