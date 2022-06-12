import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SpaseChat} from "../interface/space-chat";
import {Observable} from "rxjs";

@Injectable()
export class ChatService {
  private isUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  public createChat(chat: SpaseChat): Observable<any> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.post<any>(`${this.isUrl}/chat/initiate`, {
      title: chat.title,
      kind: chat.kind,
      users: []
    }, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }
}
