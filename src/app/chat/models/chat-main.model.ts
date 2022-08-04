import {SpaseChat} from "../interface/space-chat";
import {EChat} from "../enum/chat";
import {User} from "../interface/user.interface";
import {Chat} from "./chat.model";

export class ChatMainModel {
  private readonly title: string = '';
  private readonly _id: string = '';
  private kind: EChat;
  private users: User[] = [];
  private chats: Chat[] = [];
  private currentChat: Chat;

  constructor(res: SpaseChat) {
    this.title = res.title;
    this._id = res._id;
    this.kind = res.kind;
    this.users = res.users;
    this.chats = res.chats;

  }

  public getTitle(): string {
    return this.title;
  }

  public getChatMainId(): string {
    return this._id;
}

  public setChat(chats: Chat[]): ChatMainModel {
     this.chats = chats;
     return this;
  }

  public deleteChat(_id: string): ChatMainModel {
    this.chats = this.chats.filter((item: Chat) => item.getChatId() !== _id)
    return this;
  }

  public deleteUser(_id: string): ChatMainModel {
    this.chats = this.chats.filter((item: Chat) => item.getUsersId().filter((val: string) => val !== _id));
    return this;
  }

  public setCurrentChat(chat: Chat): void {
    this.currentChat = chat;
  }

  public getChats(): Chat[] {
    return this.chats;
  }

}
