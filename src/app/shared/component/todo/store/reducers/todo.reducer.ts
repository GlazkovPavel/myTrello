import {StateInterface} from "../../interface/state.interface";
import {createReducer, on} from "@ngrx/store";
import {loadTodoListSuccess} from "../actions/todo.action";
import {IListTodoInterface} from "../../interface/todo.interface";

export const KEY = 'todoList';

export const initialState: StateInterface = {
  list: []
}

export const todoReducer = createReducer(
  initialState,
  on(loadTodoListSuccess, (state: StateInterface, {list}: { list: IListTodoInterface[] }) => {
    return {
      ...state,
      list
    }
  })
)
