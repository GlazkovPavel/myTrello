import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addTodo, createdTodoList,
  deleteTodo, deleteTodoList,
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
        withLatestFrom(this.store.select(getCurrentTodoListSelector), this.store.select(getList)),
        switchMap(
          ([{todo}, currentList, list]: [{ todo: ITodoInterface }, IListTodoInterface, IListTodoInterface[]]) => {
          const todoList = currentList.list.concat()
          todoList.unshift(todo)
          const array: IListTodoInterface = {
            ...currentList,
            list: todoList
          }
          return this.todoService.updateTodo(array).pipe(
            switchMap((currentList: IListTodoInterface) => this.updateList(currentList, list))
          );
        })
      )
  )

  public updateTodo$: Observable<Action> = createEffect(
    () => this.actions
      .pipe(
        ofType(updateTodo),
        withLatestFrom(this.store.select(getCurrentTodoListSelector), this.store.select(getList)),
        switchMap(([{todo}, currentList, list]: [{ todo: ITodoInterface }, IListTodoInterface, IListTodoInterface[]]) => {
          let todoUpdate = currentList.list.concat()
          todoUpdate = todoUpdate.map(
            item => item._id === todo._id ? { ...item, isCompleted: !todo.isCompleted} : item
          )
          const array: IListTodoInterface = {
            ...currentList,
            list: todoUpdate
          }
          return this.todoService.updateTodo(array).pipe(
            switchMap((currentList: IListTodoInterface) => this.updateList(currentList, list))
          );
        })
      )
  )

  public deleteTodo$: Observable<Action> = createEffect(
    () => this.actions
      .pipe(
        ofType(deleteTodo),
        withLatestFrom(this.store.select(getCurrentTodoListSelector), this.store.select(getList)),
        switchMap(([{todo}, currentList, list]: [{ todo: ITodoInterface }, IListTodoInterface, IListTodoInterface[]]) => {

          let todoDelete = currentList.list.concat()
          todoDelete = todoDelete.filter(item => item._id !== todo._id);

          const array: IListTodoInterface = {
            ...currentList,
            list: todoDelete
          }

          return this.todoService.updateTodo(array).pipe(
            switchMap((currentList: IListTodoInterface) => this.updateList(currentList, list))
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
        map(([createdList, list]: [IListTodoInterface, IListTodoInterface[]]) => {
          let listArray: IListTodoInterface[] = list.concat();
          listArray.unshift(createdList);
          updateCurrentTodoList({currentList: createdList});
          return loadTodoListSuccess({list: listArray});
        })
      )
  )

  public deleteTodoList$: Observable<Action> = createEffect(
    () => this.actions
      .pipe(
        ofType(deleteTodoList),
        switchMap(({deleteTodoList}) => this.todoService.deleteTodoListById(deleteTodoList).pipe(
          withLatestFrom(this.store.select(getList)),
          map(([list, listArray]: [IListTodoInterface, IListTodoInterface[]]) => {
            let listTodoArray: IListTodoInterface[] = listArray.concat();
            listTodoArray = listTodoArray.filter(item => item._id !== list._id)

            return loadTodoListSuccess({list: listTodoArray})
          })
        )),

      )
  )

  constructor(
    private actions: Actions,
    private todoService: TodoService,
    private store: Store
  ) {
  }

  public updateList(currentList: IListTodoInterface, list: IListTodoInterface[]): Observable<Action> {
     list = list.map(
      item => item._id === currentList._id ? currentList : item
    )
    updateCurrentTodoList({currentList})
    return of(loadTodoListSuccess({list}));
  }
}
