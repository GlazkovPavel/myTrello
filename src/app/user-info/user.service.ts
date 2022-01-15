import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {IUserInterface} from "../interface/user.interface";
import {ITaskInterface} from "../interface/task.interface";
import {IResponseTaskInterface} from "../interface/responseTask.interface";
import {FormControl, ValidationErrors} from "@angular/forms";


@Injectable()
export class UserService {

  private isUrl: string = 'http://localhost:3000';
  private jwt: string = localStorage.getItem('jwt');


  constructor(private http: HttpClient) { }

  public getUserInfo(): Observable<IUserInterface>{

    return this.http.get<IUserInterface>(`${this.isUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${this.jwt}`,
        'Content-Type': 'application/json'
      }
    }).pipe(map((res) => {
      return res
    }))
  }

  public uniqueUsername({value: username}: FormControl): Observable<ValidationErrors | null> {
    return this.http.post('http://localhost:3000/username', {
      username
    }).pipe(map((valid) => {
      debugger
      return !valid ? null : { usernameErr: 'Данное имя пользователя занято'}
    }))
  }

}
