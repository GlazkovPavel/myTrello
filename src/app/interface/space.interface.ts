import {IListInterface} from "./list.interface";

export interface ISpaceInterface {
  title?: string,
  _id?: string,
  list?: IListInterface[]
}
