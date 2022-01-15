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
  private jwt: string = localStorage.getItem('jwt');


  constructor(private http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserInfoInterface | null> {

    return this.http.get<IUserInfoInterface | null>(`${this.isUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${this.jwt}`,
        'Content-Type': 'application/json'
      }
    }).pipe(map((res: IUserInfoInterface | null) => {
      const userInfo: IUserInfoInterface = {
        email: res.email,
        name: res.name,
        username: res?.username
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
        return res
    }),
      catchError(() => {
        return of(null);
      }))

  }
}
