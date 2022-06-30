import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SpaseChat} from "../interface/space-chat";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ChatMainModel} from "../models/chat-main.model";
import {ChatModelArray} from "../components/side-panel/side-panel.component";
import {catchError, map, startWith} from "rxjs/operators";
import {State} from "../enum/state";
import {ErrorModel} from "../../shared/error/models/error.model";
import {Chats} from "../interface/chats";

@Injectable()
export class ChatService {
  public cashChats$: BehaviorSubject<ChatMainModel[]> = new BehaviorSubject<ChatMainModel[]>(null);
  public chat$: BehaviorSubject<ChatMainModel> = new BehaviorSubject<ChatMainModel>(null);
  public cashChats: ChatMainModel[] = [];
  private spaseChat: SpaseChat[] = null;
  private chat: ChatMainModel = null;
  private isUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  public initModel(model: SpaseChat[]): ChatMainModel[] {
    this.spaseChat = model;
    this.cashChats = this.spaseChat.map((res: SpaseChat) =>
      new ChatMainModel({
        _id: res._id,
        title: res.title,
        chats: res.chats,
        users: res.users,
        kind: res.kind,
      }))

    this.cashChats$.next(this.cashChats);
    return this.cashChats;
  }

  public getChats(): Observable<ChatModelArray> {
    return this.cashChats$.pipe(
      map((item: ChatMainModel[]) => ({
        state: State.READY,
        item,
      })),
      startWith({state: State.PENDING}),
      catchError((ex: ErrorModel) =>
        of({
          state: State.ERROR,
          error: ex,
        }),
      ),
    );
  }

  public setCashChat(chat: Chats): void {
    this.cashChats.push()
    //this.cashChats$.next(chat);
  }

  public setChat(chat: ChatMainModel): void {
    this.chat$.next(chat);
  }

  public getChat(): ChatMainModel {
    return this.chat$.getValue();
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
