import { Injectable } from '@angular/core';
import {SpaseChat} from "../interface/space-chat";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class HttpChatService {
  private isUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

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

  public deleteChatSpace(_id: string): Observable<void> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.delete<void>(`${this.isUrl}/room/${_id}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }
}
