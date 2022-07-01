import {ErrorModel} from "./error.model";
import {State} from "../../enum/state";

export interface IModelItem<T> {
  item?: T;
  error?: ErrorModel;
  state: State;
}
