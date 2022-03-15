import { Component, OnInit} from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Observable, of} from "rxjs";
import {IListTodoInterface, ITodoInterface} from "../interface/todo.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  public currentTodoList: IListTodoInterface;
  public lists$: Observable<IListTodoInterface[]>;
  public titleTask: string = '';
  public titleList: string = '';
  public lists: IListTodoInterface[] = [];
  public showCompletedTodo: boolean = false;
  public checkCompletedTodo: boolean = false;
  public checkArrayTodo: boolean = false;

  constructor(private todoService: TodoService) { }

  public ngOnInit(): void {
     this.lists$ = this.getTodoList();
  }

  private getTodoList(): Observable<IListTodoInterface[]> {
    return this.todoService.getTodo().pipe(
      tap((data: IListTodoInterface[]) => {
        this.lists = data;
        this.lists.map(val => val.list.reverse().sort(function (todo: ITodoInterface) {
          if(todo.isCompleted === true) {
            return 1;
          }
          return -1;
        }));
        this.currentTodoList = this.lists[0];
        this.checkCompleted(this.currentTodoList);
        this.checkArrayTodos();
      })
    );
  }

 public onRemove(todoDelete: ITodoInterface): void {

    const listUpdate = this.currentTodoList
   listUpdate.list = listUpdate.list.filter(todo => todo._id !== todoDelete._id);

   this.todoService.updateTodo(listUpdate).subscribe(
      (value: IListTodoInterface) => {
        this.currentTodoList = value;
        this.lists.map((list: IListTodoInterface) => list === value);
        this.lists$ = of(this.lists);
      },
      error => console.log(error)
    )
  };

  private checkCompleted(item: IListTodoInterface) {
    this.checkCompletedTodo = item?.list.some(value => value.isCompleted === true);
  }

  private checkArrayTodos(): void {
    if(this.lists.length === 0) {
      this.checkArrayTodo = true;
    }
  }

  public onComplete(todoOnComplete: ITodoInterface) {

    const todo: ITodoInterface = {
      _id: todoOnComplete._id,
      titleTodo: todoOnComplete.titleTodo,
      isCompleted: !todoOnComplete.isCompleted
    };
    this.currentTodoList.list = this.currentTodoList.list.filter((val) => val._id !== todo._id);
    if(todo.isCompleted === false) {
      this.currentTodoList.list.unshift(todo);
    } else if (todo.isCompleted === true) {
      this.currentTodoList.list.push(todo);
    }
    this.checkCompleted(this.currentTodoList);

    this.todoService.updateTodo(this.currentTodoList).subscribe(
      (value: IListTodoInterface) => {
        this.currentTodoList = value;
        this.lists$ = of(this.lists);
      },
      error => console.log(error)
    )
  }

  public onCreateList() {
    if (this.titleList) {
      this.todoService.createTodo(this.titleList).pipe(
      ).subscribe(
        (value) => {
          this.titleList = '';
          this.lists.unshift(value)
          this.lists$ = of(this.lists);
          this.checkArrayTodo = false;
          console.log(this.lists)
        },
        error => console.log(error)
      )
    }
  }

  public onCreateTask() {
    if (this.titleTask) {
      const todo: ITodoInterface = {
        titleTodo: this.titleTask,
        isCompleted: false
      };
      const listArray = this.currentTodoList;
      listArray.list.unshift(todo);

      this.todoService.updateTodo(listArray).pipe(
      ).subscribe(
        (value) => {
          this.titleTask = '';
          this.currentTodoList = value;
          this.lists$ = of(this.lists);
        },
        error => {
          this.currentTodoList.list.pop()
          console.log(error)
        }
      )
    }
  }

  public currentTodo(list: IListTodoInterface) {
    this.currentTodoList = this.lists.find((value) => value._id === list._id);
    this.checkCompleted(this.currentTodoList);
  }

  public onDeleteList(list: IListTodoInterface) {
    this.todoService.deleteTodoById(list).subscribe(() => {
      this.lists = this.lists.filter((listDelete: IListTodoInterface) => listDelete._id !== list._id);
      this.lists$ = of(this.lists);
      this.currentTodoList = this.lists[0];
      this.checkArrayTodos();
    })
  }

  public onShowCompleted() {
    this.showCompletedTodo = !this.showCompletedTodo
  }
}
