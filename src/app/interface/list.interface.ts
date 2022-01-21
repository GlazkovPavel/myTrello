import {ICardInterface} from "./card.interface";

export interface IListInterface {
  titleList?: string,
  idList?: string,
  card: ICardInterface[]
}
