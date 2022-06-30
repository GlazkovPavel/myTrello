import {State} from "../../../chat/enum/state";
import {ErrorModel} from "./error.model";

export interface IModelItem<T> {
  item?: T;
  error?: ErrorModel;
  state: State;
}
