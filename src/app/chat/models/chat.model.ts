import {EChat} from "../enum/chat";
import {User} from "../interface/user.interface";
import {Chats} from "../interface/chats";


export class Chat {

  private readonly title: string = '';
  private readonly id: string = '';
  private kind: EChat;
  private users: User[] = [];

  constructor(res: Chats) {
    this.title = res.title;
    this.id = res._id;
    this.kind = res.kind;
    this.users = res.users;

  }

  public getUsers(): User[] {
    return this.users;
  }

}
