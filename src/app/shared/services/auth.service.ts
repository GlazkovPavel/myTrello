import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUserInterface} from "../../interface/user.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: boolean = false;
  private isUrl: string = 'http://localhost:3000/'

  constructor( private http: HttpClient ) {
  }

  login() {
    this.isAuth = true;
  }

  logout() {
    this.isAuth = false;
  }

  register(user: IUserInterface): Observable<any> {
    return this.http.post<any>(`${this.isUrl}/signup`, user);
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>( resolve => {
      setTimeout(() => {
        resolve(this.isAuth)
      }, 1000)
    })
  }
}
