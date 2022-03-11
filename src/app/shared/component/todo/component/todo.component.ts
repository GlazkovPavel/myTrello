import { Component, OnInit} from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Observable, of} from "rxjs";
import {IListTodoInterface, ITodoInterface} from "../interface/todo.interface";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  public todoList$: Observable<ITodoInterface[]>;
  public lists$: Observable<IListTodoInterface[]>;
  public titleTask: string = '';
  public titleList: string = '';
  private todoList: ITodoInterface[];
  private list: IListTodoInterface[] = [];

  constructor(private todoService: TodoService) { }

  public ngOnInit(): void {
     this.todoList$ = this.getTodoList();
  }

  public onCreateTask() {
    // if(this.titleTask) {
    //   this.todoService.createTodo(this.titleTask).pipe(
    //   ).subscribe(
    //     (value) => {
    //       this.titleTask = '';
    //       this.todoList.unshift(value)
    //       this.todoList$ = of(this.todoList);
    //     },
    //     error => console.log(error)
    //   )
    // }
  }

  private getTodoList(): Observable<ITodoInterface[]> {
    return this.todoService.getTodo().pipe(
      map((value: ITodoInterface[]) => value.sort(function (todo: ITodoInterface) {
        if(todo.isCompleted === true) {
          return 1;
        }
        if(todo.isCompleted === false) {
          return -1;
        }
        return 0;
      })),
      tap((data: ITodoInterface[]) => this.todoList = data)
    );
  }

 public onRemove(todoDelete: ITodoInterface): void {
    this.todoService.deleteTodoById(todoDelete).subscribe(
      () => {
        this.todoList = this.todoList.filter(todo => todo._id !== todoDelete._id);
        this.todoList$ = of(this.todoList);
      },
      error => console.log(error)
    )
  }

  public onComplete(todoOnComplete: ITodoInterface) {
    const todo: ITodoInterface = {
      _id: todoOnComplete._id,
      title: todoOnComplete.title,
      isCompleted: !todoOnComplete.isCompleted
    }
    this.todoService.updateTodo(todo).subscribe(
      (updateTodo: ITodoInterface) => {
        if(updateTodo.isCompleted === false) {
          this.todoList = this.todoList.filter(todo => todo._id !== todoOnComplete._id);
          this.todoList.unshift(updateTodo);
          this.todoList$ = of(this.todoList);
        } else if (updateTodo.isCompleted === true) {
          this.todoList = this.todoList.filter(todo => todo._id !== todoOnComplete._id);
          this.todoList.push(updateTodo);
          this.todoList$ = of(this.todoList);
        }
      }
    )
  }

  public onCreateList() {

    if (this.titleList) {
      this.todoService.createTodo(this.titleList).pipe(
      ).subscribe(
        (value) => {
          this.titleTask = '';
          this.list.unshift(value)
          this.lists$ = of(this.list);
          console.log(this.list)
        },
        error => console.log(error)
      )
    }

  }
}
