import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {IUserInterface} from "../interface/user.interface";
import {ITaskInterface} from "../interface/task.interface";
import {IResponseTaskInterface} from "../interface/responseTask.interface";
import {FormControl, ValidationErrors} from "@angular/forms";
import {IUserInfoInterface, IUserInfoInterfaceResponse} from "../interface/user-info.interface";


@Injectable()
export class UserService {

  private isUrl: string = 'http://localhost:3000';
  private jwt: string = localStorage.getItem('jwt');


  constructor(private http: HttpClient) { }

  // public getUserInfo(): Observable<IUserInterface>{
  //
  //   return this.http.get<IUserInterface>(`${this.isUrl}/users/me`, {
  //     headers: {
  //       authorization: `Bearer ${this.jwt}`,
  //       'Content-Type': 'application/json'
  //     }
  //   }).pipe(map((res) => {
  //     return res
  //   }))
  // }

  public updateUserInfo(userInfo: IUserInfoInterface): Observable<IUserInfoInterfaceResponse>{

    return this.http.patch<IUserInfoInterfaceResponse>(`${this.isUrl}/users/me`,
      userInfo, {
        headers: {
          authorization: `Bearer ${this.jwt}`,
          'Content-Type': 'application/json'
        }
      }).pipe(map((res: IUserInfoInterfaceResponse | null) => {
      const userInfo: IUserInfoInterface = {
        email: res.data.email,
        name: res.data.name,
        username: res?.data.username,
        avatar: res?.data.avatar
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      return res
    }))
  }



}
