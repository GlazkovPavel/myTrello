import {SpaseChat} from "../interface/space-chat";
import {EChat} from "../enum/chat";
import {User} from "../interface/user.interface";
import {Chats} from "../interface/chats";

export class ChatModel {
  private title: string = '';
  private id: string = '';
  private kind: EChat;
  private users: User;
  private chats: Chats;

  constructor(res: SpaseChat) {
    this.title = res.title;
    this.id = res._id;
    this.kind = res.kind;
    this.users = res.users;
    this.chats = res.chats;

  }
}
