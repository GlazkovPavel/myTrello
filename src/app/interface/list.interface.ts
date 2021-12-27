import {ICardInterface} from "./card.interface";

export interface IListInterface {
  title?: string,
  id?: string,
  card?: ICardInterface[]
}
