import {IModelWithStateInterface} from "../../interface/modelWithState.interface";
import {ActionReducerMap, createReducer, MetaReducer} from "@ngrx/store";
import {environment} from "../../../../environments/environment.prod";

export interface State {
  store: IModelWithStateInterface<any>;
}

export const chatReducer = createReducer()

export const reducers: ActionReducerMap<State> = {
  store: chatReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
