import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUserInterface} from "../../interface/user.interface";
import {Observable, of, Subscription, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {IUserLoginInterface} from "../../interface/user-login.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean = false;
  private isUrl: string = 'http://localhost:3000'

  constructor( private http: HttpClient, private route: Router ) {
  }

  loginIn(userLogin: IUserLoginInterface): Subscription {
    return this.http.post<any>(`${this.isUrl}/signin`, userLogin)
      .pipe(map((token) => {
        this.isAuth = true;
         console.log(token);
         this.route.navigate(['/'])

        }),
        catchError(() => of(null))
      ).subscribe()
  }

  logout() {
    this.isAuth = false;
  }

  register(user: IUserInterface): Observable<any> {
    debugger
    return this.http.post<any>(`${this.isUrl}/signup`, user)
      .pipe(map((userResponse) => {
        if(userResponse) {
          const userLogin = {
            email: userResponse.user.email,
            password: user.password
          }
          this.loginIn(userLogin)
        }
      }),
        catchError(() => of(null))
      )
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>( resolve => {
      resolve(this.isAuth)
    })
  }
}
