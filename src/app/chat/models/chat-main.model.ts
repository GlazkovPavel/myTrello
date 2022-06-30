import {SpaseChat} from "../interface/space-chat";
import {EChat} from "../enum/chat";
import {User} from "../interface/user.interface";
import {Chat} from "./chat.model";

export class ChatMainModel {
  private readonly title: string = '';
  private readonly id: string = '';
  private kind: EChat;
  private users: User[] = [];
  private chats: Chat = null;

  constructor(res: SpaseChat) {
    this.title = res.title;
    this.id = res._id;
    this.kind = res.kind;
    this.users = res.users;
    this.chats = res.chats;

  }

  public getTitle(): string {
    return this.title;
  }

  public getChatMainId(): string {
    return this.id;
}

  public setChat(): ChatMainModel {
    return this
  }

}
