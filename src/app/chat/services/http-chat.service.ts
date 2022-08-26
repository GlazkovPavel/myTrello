import { Injectable } from '@angular/core';
import {SpaseChat} from "../interface/space-chat";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IChats} from "../interface/chats";
import {Chat} from "../models/chat.model";
import {IUserInfoInterface} from "../../interface/user-info.interface";
import {ChatMainModel} from "../models/chat-main.model";

@Injectable()
export class HttpChatService {
  private isUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public createChatRoom(chat: SpaseChat): Observable<any> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.post<any>(`${this.isUrl}/chat/initiate`, {
      title: chat.title,
      users: []
    }, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public createChat(chat: IChats): Observable<any> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.post<any>(`${this.isUrl}/chat`, {
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

  public addChatInRoom(chat: Chat, chatsModel: ChatMainModel): Observable<any> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.patch<any>(`${this.isUrl}/add-chat/${chatsModel.getChatMainId()}`, {
      chat
    }, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  };

  public deleteChatInRoom(chat: Chat, chatsModel: ChatMainModel): Observable<any> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.patch<any>(`${this.isUrl}/delete-chat/${chatsModel.getChatMainId()}`, {
      chat
    }, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  };

  public deleteChatSpace(_id: string): Observable<void> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.delete<void>(`${this.isUrl}/room/${_id}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  };

  public deleteChat(chat: Chat): Observable<any> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.patch<any>(`${this.isUrl}/chat-delete`, {
      chat: chat
    },{
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  };

  public addUserInChat(user: IUserInfoInterface, chat: Chat): Observable<IChats> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.patch<IChats>(`${this.isUrl}/chat-add-user`, {
      user,
      chat
    }, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  };

  public deleteUserInChat(user: IUserInfoInterface, chat: Chat): Observable<IChats> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.patch<IChats>(`${this.isUrl}/chat-delete-user`, {
      user,
      chat
    }, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  };

  public postMessage(message: string, chat: Chat): Observable<any> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.post<any>(`${this.isUrl}/chat-message/${chat.getChatId()}`, {
      messageText: message
    }, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  };

  public getMessageByRoomId(chat: Chat): Observable<any> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.get<any>(`${this.isUrl}/chat-message/${chat.getChatId()}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  };
}
