import {EChat} from "../enum/chat";
import {IChats} from "../interface/chats";


export class Chat {

  private title: string;
  private _id: string = '';
  private kind: EChat;
  private users: string[] = [];
  private chatInitiator: string;

  constructor(res: IChats) {
    this.title = res.title;
    this._id = res._id;
    this.kind = res.kind;
    this.users = res.users;
    this.chatInitiator = res.chatInitiator;
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

  public deleteUserFromChat(id: string): Chat {
    this.users = this.users.filter(item => item !== id);
    return this;
  };

  public addUserInChat(id: string): Chat {
    this.users.push(id);
    return this;
  };

  public getChatTitle(): string {
    return this.title;
  };

  public getChatId(): string {
    return this._id;
  };

  public getOwnerId(): string {
    return this.chatInitiator;
  };

  public getKind(): number {
    return this.kind;
  };

}
