import {Component, Input, OnInit} from '@angular/core';
import {Action} from "../../enum/action";
import {Event} from "../../enum/event";
import {SocketService} from "../../services/socket.service";
import {User} from "../interface/user.interface";
import {Message} from "../../models/message.model";
import {IUserInfoInterface} from "../../../interface/user-info.interface";
import {Observable} from "rxjs";


@Component({
  selector: 'app-components',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public usersWorkSpaceOwner$: Observable<IUserInfoInterface[]>;
  public users$!: Observable<IUserInfoInterface[]>;
  public userModalShow:  boolean = false;
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.initIoConnection();
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

  deletedOwnerWorkspace($event: IUserInfoInterface) {

  }

  clickOutside() {

  }

  public onInputShow(): void {
    this.userModalShow = !this.userModalShow ;
  }

  searchUser($event: any) {

  }

  addWorkspaceOwner(mask: any) {

  }
}
