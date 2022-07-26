import {Component, OnInit} from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Observable, of} from "rxjs";
import {IListTodoInterface, ITodoInterface} from "../interface/todo.interface";
import {tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {getCurrentTodoListSelector, getList} from "../store/selectors/todo.selectors";
import {
  addTodo,
  createdTodoList,
  deleteTodo,
  loadTodoList,
  updateCurrentTodoList,
  updateTodo
} from "../store/actions/todo.action";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  //public currentTodoList: IListTodoInterface;
  public currentTodoList$: Observable<IListTodoInterface>;
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
        //this.checkCompleted(this.currentTodoList);
        this.checkArrayTodos();
        // this.store.select(getCurrentTodoListSelector)
        //   .subscribe(
        //     ((item: IListTodoInterface) => {
        //       this.titleTask = '';
        //       this.currentTodoList = item;
        //
        //     })
        //   )
        this.currentTodoList$ = this.store.select(getCurrentTodoListSelector);
      })
    );
  }

  public checkCompleted(item: IListTodoInterface): boolean {
    return item?.list.some(value => value.isCompleted === true);
  }

  private checkArrayTodos(): void {
    // if (this.lists.length === 0) {
    //   this.checkArrayTodo = true;
    // }
  }

  public onRemove(todoDelete: ITodoInterface): void {

    this.store.dispatch(deleteTodo({todo: todoDelete}));

  };

  public onComplete(todoOnComplete: ITodoInterface) {
    this.store.dispatch(updateTodo({todo: todoOnComplete}))

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
    this.store.dispatch(updateCurrentTodoList({currentList: list}));

  }

  public onDeleteList(list: IListTodoInterface) {
    this.todoService.deleteTodoById(list).subscribe(() => {
      this.lists = this.lists.filter((listDelete: IListTodoInterface) => listDelete._id !== list._id);
      this.lists$ = of(this.lists);
      //this.currentTodoList = this.lists[0];
      this.checkArrayTodos();
    })
  }

  public onShowCompleted() {
    this.showCompletedTodo = !this.showCompletedTodo
  }

}
