import {EChat} from "../enum/chat";
import {User} from "../interface/user.interface";
import {IChats} from "../interface/chats";


export class Chat {

  private title: string;
  private _id: string = '';
  private kind: EChat;
  private users: string[] = [];

  constructor(res: IChats) {
    this.title = res.title;
    this._id = res._id;
    this.kind = res.kind;
    this.users = res.users;

  }

  // public getUsers(): string[] {
  //   return this.users;
  // }

  public getUsersId(): string[] {
    return this.users;
  };

  public setUsersId(usersId: string[]): Chat {
    this.users = usersId;
    return this;
  };


  public getChatTitle(): string {
    return this.title;
  }

  public getChatId(): string {
    return this._id;
  }

}
