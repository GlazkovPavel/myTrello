import {ICardInterface} from "./card.interface";

export interface IListInterface {
  titleList?: string,
  _id?: string,
  card: ICardInterface[]
}
