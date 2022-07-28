import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Observable, of} from "rxjs";
import {IListTodoInterface, ITodoInterface} from "../interface/todo.interface";
import {catchError, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {getCurrentTodoListSelector, getList} from "../store/selectors/todo.selectors";
import {
  addTodo,
  createdTodoList,
  deleteTodo,
  deleteTodoList,
  loadTodoList,
  updateCurrentTodoList,
  updateTodo
} from "../store/actions/todo.action";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorModel} from "../../../error/models/error.model";
import {ErrorMethods} from "../../../error/enum/error-methods.enum";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  public currentTodoList$: Observable<IListTodoInterface>;
  public currentTodoList: IListTodoInterface;
  public lists$: Observable<IListTodoInterface[]>;
  public lists: IListTodoInterface[] = [];
  public showCompletedTodo: boolean = false;
  public checkArrayTodo: boolean = false;
  public form: FormGroup;
  public formList: FormGroup;

  constructor(
    private todoService: TodoService,
    private store: Store,
  ) {
  }

  public ngOnInit(): void {
    this.store.dispatch(loadTodoList());
    this.lists$ = this.getTodoList();

    this.form = new FormGroup({
      titleTask: new FormControl(null, [
        Validators.required,
      ]),
    })

    this.formList = new FormGroup({
      list: new FormControl(null, [
        Validators.required,
      ]),
    })

  }

  private getTodoList(): Observable<IListTodoInterface[]> {
    return this.store.select(getList).pipe(
      tap((data: IListTodoInterface[]) => {
        this.lists = data;
        this.store.dispatch(updateCurrentTodoList({currentList: this.lists[0]}))
        this.currentTodoList$ = this.store.select(getCurrentTodoListSelector).pipe(
          catchError((err: ErrorModel) => {
            if (err.getMethod() === ErrorMethods.UPDATE_LIST) {
              this.store.dispatch(updateCurrentTodoList({currentList: this.currentTodoList}));
            }
            return of(null);
          })
        );
      }),
      catchError((err: ErrorModel) => {
        if (err.getMethod() === ErrorMethods.UPDATE_LIST) {
          this.store.dispatch(updateCurrentTodoList({currentList: this.currentTodoList}));
        }
        return of(null);
      })
    );
  }

  public checkCompleted(item: IListTodoInterface): boolean {
    return item?.list.some(value => value.isCompleted === true);
  }

  public onRemove(todoDelete: ITodoInterface): void {

    this.store.dispatch(deleteTodo({todo: todoDelete}));

  };

  public onComplete(todoOnComplete: ITodoInterface) {
    this.store.dispatch(updateTodo({todo: todoOnComplete}));

  }

  public onCreateList() {
    const titleList: string = this.formList.controls['list'].value;

    this.store.dispatch(createdTodoList({titleList}));
    this.formList.reset();
  }

  public onCreateTask() {
    const todo: ITodoInterface = {
      titleTodo: this.form.controls['titleTask'].value,
      isCompleted: false
    };
    this.store.dispatch(addTodo({todo}));
    this.form.reset();
  }

  public currentTodo(list: IListTodoInterface) {
    this.currentTodoList = list;
    this.store.dispatch(updateCurrentTodoList({currentList: list}));

  }

  public onDeleteList(list: IListTodoInterface) {
    this.store.dispatch(deleteTodoList({deleteTodoList: list}));
  }

  public onShowCompleted() {
    this.showCompletedTodo = !this.showCompletedTodo
  }

}
