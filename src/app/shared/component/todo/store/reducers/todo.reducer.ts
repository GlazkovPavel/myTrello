import {StateInterface} from "../../interface/state.interface";
import {createReducer, on} from "@ngrx/store";
import {loadTodoListSuccess, updateCurrentTodoList} from "../actions/todo.action";
import {IListTodoInterface} from "../../interface/todo.interface";

export const KEY = 'todoList';

export const initialState: StateInterface = {
  list: [],
  currentList: {
    list: [],
    titleList: '',
    _id: ''
  }
}

export const todoReducer = createReducer(
  initialState,
  on(loadTodoListSuccess,
    (state: StateInterface, {list}: { list: IListTodoInterface[] }) => {
      return {
        ...state,
        list
      }
    }),
  on(updateCurrentTodoList, (state: StateInterface, action) => ({
    ...state,
    currentList: action.currentList
  })),
)
