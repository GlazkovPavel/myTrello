import {createAction, props} from "@ngrx/store";
import {IListTodoInterface} from "../../interface/todo.interface";

export const loadTodoList = createAction('loadTodoList');

export const loadTodoListSuccess = createAction('loadTodoListSuccess', props<{ list: IListTodoInterface[] }>());
