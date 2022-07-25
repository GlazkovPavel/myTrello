import {createAction, props} from "@ngrx/store";
import {IListTodoInterface, ITodoInterface} from "../../interface/todo.interface";

export const loadTodoList = createAction('loadTodoList');

export const loadTodoListSuccess = createAction('loadTodoListSuccess', props<{ list: IListTodoInterface[] }>());

//export const getTodoList = createAction('getTodoList');

export const updateCurrentTodoList = createAction('updateCurrentTodoList', props<{ currentList: IListTodoInterface }>());

export const addTodo = createAction('addTodo', props<{ todo: ITodoInterface }>());

export const updateTodo = createAction('addTodo', props<{ todo: ITodoInterface }>());



