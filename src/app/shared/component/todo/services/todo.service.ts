import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IListTodoInterface, ITodoInterface} from "../interface/todo.interface";
import {Observable} from "rxjs";

@Injectable()
export class TodoService {
  private isUrl: string = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  public createTodo(title: string): Observable<IListTodoInterface> {
  const jwt: string = localStorage.getItem('jwt');
  const data = {titleList: title}
    return this.http.post<IListTodoInterface>(`${this.isUrl}/todo`, data, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }
  public updateTodo(todo: ITodoInterface): Observable<ITodoInterface> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.patch<ITodoInterface>(`${this.isUrl}/todo`, todo, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public getTodo(): Observable<ITodoInterface[]> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.get<ITodoInterface[]>(`${this.isUrl}/todos`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public deleteTodoById(todo: ITodoInterface): Observable<void> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.delete<void>(`${this.isUrl}/todo/${todo._id}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }
}
