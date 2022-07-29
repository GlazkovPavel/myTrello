import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {IUserInfoInterface} from "../../interface/user-info.interface";
import {ISpaceInterface} from "../../interface/space.interface";

@Injectable()
export class UsersService {

  private isUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public searchUser(search: string): Observable<IUserInfoInterface[]> {
  const jwt: string = localStorage.getItem('jwt');
  const req = {
    name: search
  }
    return this.http.post<IUserInfoInterface[]>(`${this.isUrl}/users`, req, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public searchUsersWorkSpace(users: string[]): Observable<IUserInfoInterface[]> {
    const jwt: string = localStorage.getItem('jwt');
    const req = {
      users: users
    }
    return this.http.post<IUserInfoInterface[]>(`${this.isUrl}/users-workspace`, req, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }


}
