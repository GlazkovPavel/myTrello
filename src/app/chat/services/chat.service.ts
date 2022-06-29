import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SpaseChat} from "../interface/space-chat";
import {Observable} from "rxjs";
import {ChatModel} from "../models/chat.model";

@Injectable()
export class ChatService {
  public cashChats: SpaseChat[] = [];
  private model: ChatModel = null;
  private chat: SpaseChat = null;
  private isUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  public initModel(model: SpaseChat[]): SpaseChat[] {
    this.cashChats = model;
    return this.cashChats;
  }

  public getChats(): SpaseChat[] {
    return this.cashChats;
  }

  public setChat(chat: SpaseChat): void {
    this.chat = chat;
  }

  public getChat(): SpaseChat {
    return this.chat;
  }

  public resetChat(): void {
    this.chat = null;
  }

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
