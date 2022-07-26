import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addTodo, createdTodoList,
  deleteTodo,
  loadTodoList,
  loadTodoListSuccess,
  updateCurrentTodoList,
  updateTodo
} from "../actions/todo.action";
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {TodoService} from "../../services/todo.service";
import {IListTodoInterface, ITodoInterface} from "../../interface/todo.interface";
import {getCurrentTodoListSelector, getList} from "../selectors/todo.selectors";

@Injectable()
export class TodoEffect {
  public listLoad$: Observable<Action> = createEffect(
    () => this.actions
      .pipe(
        ofType(loadTodoList),
        switchMap(() => this.todoService.getTodo().pipe(
          map((list: IListTodoInterface[]) => {
            list.map(val => val.list.reverse().sort(function (todo: ITodoInterface) {
              if (todo.isCompleted === true) {
                return 1;
              }
              return -1;
            }));
            return  loadTodoListSuccess({list})
            }
          )
        ))
      )
  )

  public addTodo$: Observable<Action> = createEffect(
    () => this.actions
      .pipe(
        ofType(addTodo),
        withLatestFrom(this.store.select(getCurrentTodoListSelector)),
        switchMap(([{todo}, currentList]: [{ todo: ITodoInterface }, IListTodoInterface]) => {
          const todoList = currentList.list.concat()
          todoList.unshift(todo)
          const array: IListTodoInterface = {
            ...currentList,
            list: todoList
          }
          return this.todoService.updateTodo(array).pipe(
            map((currentList: IListTodoInterface) => updateCurrentTodoList({currentList}))
          );
        })
      )
  )

  public updateTodo$: Observable<Action> = createEffect(
    () => this.actions
      .pipe(
        ofType(updateTodo),
        withLatestFrom(this.store.select(getCurrentTodoListSelector)),
        switchMap(([{todo}, currentList]: [{ todo: ITodoInterface }, IListTodoInterface]) => {
          let todoUpdate = currentList.list.concat()
          todoUpdate = todoUpdate.map(
            item => item._id === todo._id ? { ...item, isCompleted: !todo.isCompleted} : item
          )
          const array: IListTodoInterface = {
            ...currentList,
            list: todoUpdate
          }
          return this.todoService.updateTodo(array).pipe(
            map((currentList: IListTodoInterface) => updateCurrentTodoList({currentList}))
          );
        })
      )
  )

  public deleteTodo$: Observable<Action> = createEffect(
    () => this.actions
      .pipe(
        ofType(deleteTodo),
        withLatestFrom(this.store.select(getCurrentTodoListSelector)),
        switchMap(([{todo}, currentList]: [{ todo: ITodoInterface }, IListTodoInterface]) => {

          let todoDelete = currentList.list.concat()
          todoDelete = todoDelete.filter(item => item._id !== todo._id);

          const array: IListTodoInterface = {
            ...currentList,
            list: todoDelete
          }

          return this.todoService.updateTodo(array).pipe(
            map((currentList: IListTodoInterface) => updateCurrentTodoList({currentList}))
          );
        })
      )
  );


  public createList$: Observable<Action> = createEffect(
    () => this.actions
      .pipe(
        ofType(createdTodoList),
        switchMap(({titleList}) => this.todoService.createTodo(titleList).pipe(
          map((item:IListTodoInterface) => {
            const list: IListTodoInterface = {
              _id: item._id,
              titleList: item.titleList,
              list: item.list
            }
            return list;
          })
        )),
        withLatestFrom(this.store.select(getList)),
        switchMap(([createdList, list]: [IListTodoInterface, IListTodoInterface[]]) => {
          let listArray: IListTodoInterface[] = list.concat();
          listArray.unshift(createdList);
          updateCurrentTodoList({currentList: createdList});
          return  of(loadTodoListSuccess({list: listArray}));
        })
      )
  )

  constructor(
    private actions: Actions,
    private todoService: TodoService,
    private store: Store
  ) {
  }
}
