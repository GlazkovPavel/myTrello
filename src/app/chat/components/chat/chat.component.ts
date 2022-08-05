import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Action} from "../../enum/action";
import {Event} from "../../enum/event";
import {SocketService} from "../../services/socket.service";
import {User} from "../../interface/user.interface";
import {Message} from "../../models/message.model";
import {IUserInfoInterface} from "../../../interface/user-info.interface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ChatService} from "../../services/chat.service";
import {catchError, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap} from "rxjs/operators";
import {UsersService} from "../../../shared/services/users.service";
import {Chat} from "../../models/chat.model";
import {IChats} from "../../interface/chats";
import {IModelItem} from "../../../shared/error/models/models.model";
import {State} from "../../../shared/enum/state";
import {ErrorModel} from "../../../shared/error/models/error.model";

export type UserModelArray = IModelItem<IUserInfoInterface[]>;

@Component({
  selector: 'app-components',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  public usersModel$: Observable<UserModelArray>;
  //public usersWorkSpaceOwner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public users$!: Observable<IUserInfoInterface[]>;
  public searchText: Observable<string>;
  public userModalShow:  boolean = false;
  public chatTitle: string = 'Название чата';
  public state: typeof State = State;
  public showYourSelf: boolean = false;
  private cashUsers: IUserInfoInterface[];
  private user: IUserInfoInterface = JSON.parse(localStorage.getItem('userInfo'));
  action = Action;
  //user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(
    private socketService: SocketService,
    private chatService: ChatService,
    private usersService: UsersService,
    private changeDetectorRef: ChangeDetectorRef,
    ) { }

  ngOnInit(): void {
    this.initIoConnection();
    this.usersModel$ = this.getUser();
    //this.users1WorkSpaceOwner$ = this.getUsersWorkSpace();

  }

  private getUser(): Observable<UserModelArray> {
    return this.chatService.usersWorkSpaceOwner$.pipe(
      switchMap(() => this.getUsersWorkSpace()),
      tap((item: IUserInfoInterface[]) => {
        this.cashUsers = item;
      }),
      map((item: IUserInfoInterface[]) => ({
        state: State.READY,
        item
      })),
      startWith(this.cashUsers ? {
        state: State.READY,
        item: this.cashUsers
        } : {
          state: State.PENDING
        }
      ),
      catchError((ex: ErrorModel) =>
        of({
          state: State.ERROR,
          error: ex,
        }),
      ),
    )
  }

  private getUsersWorkSpace(): Observable<IUserInfoInterface[]> {
    if (!!this.chatService.usersIdChat$.getValue().length) {
      this.showYourSelf = false;
      return this.usersService.searchUsersWorkSpace(this.chatService.usersIdChat$.getValue());
    } else {
      this.showYourSelf = true;
      return of([this.user]);
    }
  }

  // проверка является ли пользователь владельцем данного чата
  public checkOwner(user: IUserInfoInterface, chat: Chat): boolean {
    return (user._id === chat.getChatId());
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  // public getChatName(): string {
  //   return
  // }

  // public sendMessage(message: string): void {
  //   if (!message) {
  //     return;
  //   }
  //
  //   this.socketService.send({
  //     from: this.user,
  //     content: message
  //   });
  //   this.messageContent = null;
  // }
  //
  // public sendNotification(params: any, action: Action): void {
  //   let message: Message;
  //
  //   if (action === Action.JOINED) {
  //     message = {
  //       from: this.user,
  //       action: action
  //     }
  //   } else if (action === Action.RENAME) {
  //     message = {
  //       action: action,
  //       content: {
  //         username: this.user.name,
  //         previousUsername: params.previousUsername
  //       }
  //     };
  //   }
  //
  //   this.socketService.send(message);
  // }

  public clickOutside(): void {
    this.userModalShow = false;
  };

  public onInputShow(): void {
    this.userModalShow = !this.userModalShow;
  };

  public searchUser($event: any): void {
    this.searchText = of(($event.target as HTMLInputElement).value.trim().toLowerCase())
    this.users$ = this.searchText.pipe(
      filter(text => text.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap( users => this.usersService.searchUser(users))
    )
  };

  public addUserInChat(user: IUserInfoInterface): void {
    this.chatService.addUserInChat(user).subscribe(
      (chat: IChats) => {
        this.chatService.addUserInChatModel(user._id, chat._id);
        this.chatService.setCurrentChat(new Chat({
          _id: chat._id,
          title: chat.title,
          users: chat.users,
          kind: chat.kind
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  public deletedOwnerWorkspace(user: IUserInfoInterface): void {
    this.chatService.deleteUserInChat(user).subscribe(
      (chat: IChats) => {
        this.chatService.deleteUserFromChatModel(user._id, chat._id);
        this.chatService.setCurrentChat(new Chat({
          _id: chat._id,
          title: chat.title,
          users: chat.users,
          kind: chat.kind
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  public setNameChat(title: string): void {
    this.chatTitle = title;
  };
}
