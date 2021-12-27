import {IListInterface} from "./list.interface";

export interface ISpaceInterface {
  title?: string,
  id?: string,
  list?: IListInterface[]
}
