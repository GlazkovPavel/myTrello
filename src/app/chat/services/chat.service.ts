import {Injectable} from "@angular/core";
import {SpaseChat} from "../interface/space-chat";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ChatMainModel} from "../models/chat-main.model";
import {ChatModelArray, ChatModelItem} from "../components/side-panel/side-panel.component";
import {catchError, map, startWith} from "rxjs/operators";
import {ErrorModel} from "../../shared/error/models/error.model";
import {State} from "../../shared/enum/state";
import {Chat} from "../models/chat.model";
import {IChats} from "../interface/chats";
import {ISpaceChatResponse} from "../interface/space-chat-response";

@Injectable()
export class ChatService {
  public cashChats$: BehaviorSubject<ChatMainModel[]> = new BehaviorSubject<ChatMainModel[]>(null);
  public chat$: BehaviorSubject<ChatMainModel> = new BehaviorSubject<ChatMainModel>(null);
  public cashChats: ChatMainModel[] = [];
  private spaceChat: ISpaceChatResponse[];
  private chat: ChatMainModel = null;

  constructor() {}

  public initModel(model: ISpaceChatResponse[]): ChatMainModel[] {
      this.spaceChat = model;
      this.cashChats = this.spaceChat.map((res: ISpaceChatResponse) => {
      const chatsArray: Chat[] = res.chats.map((chat: IChats) => new Chat(chat));

      return new ChatMainModel({
        _id: res._id,
        title: res.title,
        chats: chatsArray,
        users: res.users,
        kind: res.kind,
      })
    }

    )

    this.cashChats$.next(this.cashChats);
    return this.cashChats;
  }

  public getChatRooms(): Observable<ChatModelArray> {
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

  public getChatModelItem(): Observable<ChatModelItem> {
    return this.chat$.pipe(
      map((item: ChatMainModel) => ({
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

  public setCashChat(chat: ChatMainModel): void {
    this.cashChats.push(chat);
    this.cashChats$.next(this.cashChats);
  }

  public deleteChatSpace(_id: string): void {
    this.cashChats = this.cashChats.filter((item: ChatMainModel) => item.getChatMainId() !== _id);
    this.cashChats$.next(this.cashChats);
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

}
