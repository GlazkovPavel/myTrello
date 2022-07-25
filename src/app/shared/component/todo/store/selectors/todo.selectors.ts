import {createSelector} from '@ngrx/store';
import {StateInterface} from "../../interface/state.interface";
import {selectorByKey} from "../../interface/selector-by-key.selectors";
import {STORE_KEY} from "../utils/key";
import {KEY} from "../reducers/todo.reducer";
import {IToDoStore} from "../../interface/store.interface";
import {IListTodoInterface} from "../../interface/todo.interface";

export const listState = createSelector(
  selectorByKey<IToDoStore>(STORE_KEY),
  (state: IToDoStore): StateInterface => state && state[KEY],
);

export const getList = createSelector(
  listState,
  (state: StateInterface): IListTodoInterface[] => state.list,
);

export const getCurrentTodoListSelector = createSelector(
  listState,
  (state: StateInterface): IListTodoInterface => state.currentList,
)
