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
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
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
  public showCompletedTodo: boolean = false;
  public checkArrayTodo: boolean = false;
  public form: UntypedFormGroup;
  public formList: UntypedFormGroup;

  constructor(
    private todoService: TodoService,
    private store: Store,
  ) {
  }

  public ngOnInit(): void {
    this.store.dispatch(loadTodoList());
    this.lists$ = this.getTodoList();

    this.form = new UntypedFormGroup({
      titleTask: new UntypedFormControl(null, [
        Validators.required,
      ]),
    })

    this.formList = new UntypedFormGroup({
      list: new UntypedFormControl(null, [
        Validators.required,
      ]),
    })

  }

  private getTodoList(): Observable<IListTodoInterface[]> {
    return this.store.select(getList).pipe(
      tap((data: IListTodoInterface[]) => {
        this.store.dispatch(updateCurrentTodoList({currentList: data[0]}))
        this.currentTodoList$ = this.store.select(getCurrentTodoListSelector);
      }),
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
      isCompleted: false,
    };
    this.store.dispatch(addTodo({todo}));
    debugger;
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
