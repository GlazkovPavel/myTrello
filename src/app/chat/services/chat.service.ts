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
  public usersWorkSpaceOwner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public allChats$: BehaviorSubject<ChatMainModel> = new BehaviorSubject<ChatMainModel>(null);
  public cashChats: ChatMainModel[] = [];
  private spaceChat: ISpaceChatResponse[];
  private chatCash: ChatMainModel = null;
  private currentChat: Chat = null;

  constructor(private httpChatService: HttpChatService) {}

  public initModel(chats: IChats[], model: ISpaceChatResponse[]): void {
    this.spaceChat = model;
    this.usersIdChat$.next(this.spaceChat[0]?.chats[0]?.users);
    this.cashChats = this.spaceChat.map((res: ISpaceChatResponse) => {
      const chatsArray: Chat[] = res.chats.map((chat: IChats) => {
        return new Chat(chat)
      });
      return new ChatMainModel({
        _id: res._id,
        title: res.title,
        chats: chatsArray,
      })
    });

    const chatsArray: Chat[] = chats.map((chat: IChats) => {
      return new Chat(chat)
    });

    const chatsModel: ChatMainModel =  new ChatMainModel({
      _id: '0',
      title: 'Все чаты',
      chats: chatsArray,
    })
    this.allChats$.next(chatsModel);
    this.cashChats.unshift(chatsModel);
    this.chatCash = chatsModel;
    this.chat$.next(chatsModel);
    this.cashChats$.next(this.cashChats);

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

  // public getChats(): Observable<ChatModelItem> {
  //   return this.allChats$.pipe(
  //     map((item: ChatMainModel) => ({
  //       state: State.READY,
  //       item,
  //     })),
  //     startWith({state: State.PENDING}),
  //     catchError((ex: ErrorModel) =>
  //       of({
  //         state: State.ERROR,
  //         error: ex,
  //       }),
  //     ),
  //   );
  // }

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

  public setChat(chat: ChatMainModel, onChooseSpase: boolean = false): void {
    this.chatCash = null;
    this.chat$.next(chat);
    this.chatCash = chat;

    if (this.chatCash.getChats().length > 0) {
      this.usersIdChat$.next(this.chatCash.getChats()[0].getUsersId());
      if (onChooseSpase) {
        this.usersWorkSpaceOwner$.next(true);
      }
    } else {
      this.usersIdChat$.next([]);
    }


  }

  public updateSpaceChat(chat: ChatMainModel): void {
    this.chatCash = null;
    this.chat$.next(chat);
    this.chatCash = chat;
    this.cashChats = this.cashChats.map(item => item.getChatMainId() === chat.getChatMainId() ? chat : item);
    this.cashChats$.next(this.cashChats);

  }

  public deleteUserFromChatModel(userId: string, chatId: string): void {
    this.chat$.next(this.chatCash.deleteUser(userId, chatId));
  }

  public addUserInChatModel(userId: string, chatId: string): void {
    this.chat$.next(this.chatCash.addUser(userId, chatId));
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
    this.usersWorkSpaceOwner$.next(true);
  }

  public getCurrentChat(): Chat {
    return this.currentChat;
  }

 public isAllChats(): boolean {
    return (this.chatCash.getChatMainId() === '0');
 }

}
