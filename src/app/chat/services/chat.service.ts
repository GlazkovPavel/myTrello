import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ChatMainModel} from "../models/chat-main.model";
import {ChatModelArray} from "../components/side-panel/side-panel.component";
import {catchError, map, startWith} from "rxjs/operators";
import {ErrorModel} from "../../shared/error/models/error.model";
import {State} from "../../shared/enum/state";
import {Chat} from "../models/chat.model";
import {IChats} from "../interface/chats";
import {ISpaceChatResponse} from "../interface/space-chat-response";
import {IUserInfoInterface} from "../../interface/user-info.interface";
import {HttpChatService} from "./http-chat.service";

@Injectable()
export class ChatService {
  public cashChats$: BehaviorSubject<ChatMainModel[]> = new BehaviorSubject<ChatMainModel[]>(null);
  public chat$: BehaviorSubject<ChatMainModel> = new BehaviorSubject<ChatMainModel>(null);
  public usersIdChat$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public cashChats: ChatMainModel[] = [];
  private spaceChat: ISpaceChatResponse[];
  private chatCash: ChatMainModel = null;
  private currentChat: Chat = null;

  constructor(private httpChatService: HttpChatService) {}

  public initModel(model: ISpaceChatResponse[]): ChatMainModel[] {
      this.spaceChat = model;
      this.cashChats = this.spaceChat.map((res: ISpaceChatResponse) => {
      this.usersIdChat$.next(res?.chats[0]?.users);
      const chatsArray: Chat[] = res.chats.map((chat: IChats) => {
        return new Chat(chat)
      });

      return new ChatMainModel({
        _id: res._id,
        title: res.title,
        chats: chatsArray,
        users: res.userIds,
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

  public setCashChat(chat: ChatMainModel): void {
    this.cashChats.push(chat);
    this.cashChats$.next(this.cashChats);
  }

  public deleteChatSpace(_id: string): void {
    this.cashChats = this.cashChats.filter((item: ChatMainModel) => item.getChatMainId() !== _id);
    this.cashChats$.next(this.cashChats);
  }

  public deleteChat(_id: string): void {
    this.chat$.next(this.chatCash.deleteChat(_id));
  }

  public setChat(chat: ChatMainModel): void {
    this.chatCash = null;
    this.chat$.next(chat);
    this.chatCash = chat;

  }

  public updateChat(chat: ChatMainModel): void {
    this.chatCash = null;
    this.chat$.next(chat);
    this.chatCash = chat;
    this.cashChats = this.cashChats.map(item => item.getChatMainId() === chat.getChatMainId() ? chat : item);
    this.cashChats$.next(this.cashChats);

  }

  public getChat(): ChatMainModel {
    return this.chat$.getValue();
  }

  public resetChatCash(): void {
    this.chatCash = null;
  }

  public addUserInChat(user: IUserInfoInterface): Observable<IChats> {
    return this.httpChatService.addUserInChat(user, this.currentChat);
  }

  public deleteUserInChat(user: IUserInfoInterface): Observable<IChats> {
    return this.httpChatService.deleteUserInChat(user, this.currentChat);
  }

  public setCurrentChat(chat: Chat): void {
    this.currentChat = chat;
    this.usersIdChat$.next(this.currentChat.getUsersId());
  }

  public getCurrentChat(chat: Chat): Chat {
    return this.currentChat;
  }

}
