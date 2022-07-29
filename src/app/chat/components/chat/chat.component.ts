import {ChangeDetectorRef, Component, DoCheck, OnInit} from '@angular/core';
import {Action} from "../../enum/action";
import {Event} from "../../enum/event";
import {SocketService} from "../../services/socket.service";
import {User} from "../../interface/user.interface";
import {Message} from "../../models/message.model";
import {IUserInfoInterface} from "../../../interface/user-info.interface";
import {Observable, of} from "rxjs";
import {ChatService} from "../../services/chat.service";
import {debounceTime, delay, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";
import {UsersService} from "../../../shared/services/users.service";
import {ChatMainModel} from "../../models/chat-main.model";
import {Chat} from "../../models/chat.model";


@Component({
  selector: 'app-components',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public usersWorkSpaceOwner$: Observable<IUserInfoInterface[]>;
  public users$!: Observable<IUserInfoInterface[]>;
  public searchText: Observable<string>;
  public userModalShow:  boolean = false;
  public chatTitle: string = 'Название чата'
  action = Action;
  user: User;
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
    this.usersWorkSpaceOwner$ = this.getUsersWorkSpace();

  }

  private getUsersWorkSpace(): Observable<IUserInfoInterface[]> {
    return this.usersService.searchUsersWorkSpace(this.chatService.usersIdChat$.getValue());
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

  public deletedOwnerWorkspace(user: IUserInfoInterface): void {
    this.chatService.deleteUserWorkspaceOwner(user);
    this.usersWorkSpaceOwner$ = this.getUsersWorkSpace();
  }

  public clickOutside(): void {
    this.userModalShow = false;
  }

  public onInputShow(): void {
    this.userModalShow = !this.userModalShow;
  }

  public searchUser($event: any): void {
    this.searchText = of(($event.target as HTMLInputElement).value.trim().toLowerCase())
    this.users$ = this.searchText.pipe(
      filter(text => text.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap( users => this.usersService.searchUser(users))
    )
  }

  public addWorkspaceOwner(user: IUserInfoInterface): void {
    this.chatService.addWorkspaceOwner(user);
    this.usersWorkSpaceOwner$ = this.getUsersWorkSpace();
  }

  public setNameChat(title: string): void {
    this.chatTitle = title;
  }
}
