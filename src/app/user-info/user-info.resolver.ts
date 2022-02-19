import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {IUserInfoInterface} from "../interface/user-info.interface";

@Injectable()
export class UserInfoResolver implements Resolve<IUserInfoInterface | null> {

  private isUrl: string = 'http://localhost:3000';



  constructor(private http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserInfoInterface | null> {
  const jwt: string = localStorage.getItem('jwt');

    return this.http.get<IUserInfoInterface | null>(`${this.isUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }).pipe(map((res: IUserInfoInterface | null) => {
      const userInfo: IUserInfoInterface = {
        email: res.email,
        name: res.name,
        surname: res.surname,
        username: res?.username,
        avatar: res?.avatar,
        _id: res?._id
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
        return res
    }),
      catchError(() => {
        return of(null);
      }))

  }
}
