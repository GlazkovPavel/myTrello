import {Injectable} from "@angular/core";
import * as socketIo from 'socket.io-client';
import {Message} from "../models/message.model";
import {Observable} from "rxjs";
import {Event} from "../enum/event";
import {User} from "../components/interface/user.interface";
import {Messages} from "../components/interface/messages.interface";

const jwt: string = localStorage.getItem('jwt');
const SERVER_URL = 'http://localhost:3000';
@Injectable()
export class SocketService {
  // @ts-ignore
  private socket;

  public initSocket(): void {
    this.socket = socketIo.io(SERVER_URL, {
      path: "/chat",
      extraHeaders: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    });
  }


  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
