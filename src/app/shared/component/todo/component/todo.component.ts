import { Component, OnInit} from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Observable} from "rxjs";
import {ITodoInterface} from "../interface/todo.interface";
import {map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  public todoList$: Observable<ITodoInterface[]>;
  public title: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
     this.todoList$ = this.todoService.getTodo()
  }

  onCreate() {
    if(this.title) {
      this.todoService.createTodo(this.title).pipe(
        map(() => {
          this.title = '';
          return this.todoList$ = this.todoService.getTodo();
        })
      ).subscribe()
    }
  }
}
