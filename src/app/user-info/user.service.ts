import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {IUserInfoInterface, IUserInfoInterfaceResponse} from "../interface/user-info.interface";


@Injectable()
export class UserCheckService {

  private isUrl: string = 'http://localhost:3000';
  private jwt: string = localStorage.getItem('jwt');


  constructor(private http: HttpClient) { }

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
        surname: res.data.surname,
        username: res?.data.username,
        avatar: res?.data.avatar,
        _id: res?.data._id
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      return res
    }))
  }



}
