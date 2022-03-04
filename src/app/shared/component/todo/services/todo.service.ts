import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITodoInterface} from "../interface/todo.interface";

@Injectable()
export class TodoService {
  private isUrl: string = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  create(todo: ITodoInterface) {
  const jwt: string = localStorage.getItem('jwt');
    this.http.post(`${this.isUrl}/work-space`, todo, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }

}
