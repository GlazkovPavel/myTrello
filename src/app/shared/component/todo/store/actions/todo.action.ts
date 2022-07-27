import {createAction, props} from "@ngrx/store";
import {IListTodoInterface, ITodoInterface} from "../../interface/todo.interface";

export const loadTodoList = createAction('loadTodoList');

export const loadTodoListSuccess = createAction('loadTodoListSuccess', props<{ list: IListTodoInterface[] }>());

export const updateCurrentTodoList = createAction('updateCurrentTodoList', props<{ currentList: IListTodoInterface }>());

export const addTodo = createAction('addTodo', props<{ todo: ITodoInterface }>());

export const updateTodo = createAction('updateTodo', props<{ todo: ITodoInterface }>());

export const deleteTodo = createAction('deleteTodo', props<{ todo: ITodoInterface }>());

export const createdTodoList = createAction('createdTodoList', props<{ titleList: string }>());

export const deleteTodoList = createAction('deleteTodoList', props<{ deleteTodoList: IListTodoInterface }>());




