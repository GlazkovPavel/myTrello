import {EChat} from "../enum/chat";
import {User} from "../interface/user.interface";
import {IChats} from "../interface/chats";


export class Chat {

  private title: string;
  private id: string = '';
  private kind: EChat;
  private users: User[] = [];

  constructor(res: IChats) {
    this.title = res.title;
    this.id = res._id;
    this.kind = res.kind;
    this.users = res.users;

  }

  public getUsers(): User[] {
    return this.users;
  }

  public getChatTitle(): string {
    return this.title;
  }

}
