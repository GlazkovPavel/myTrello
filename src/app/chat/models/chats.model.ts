import {SpaseChat} from "../interface/space-chat";
import {User} from "../interface/user.interface";
import {Chat} from "./chat.model";

export class ChatsModel {
  private readonly title: string = 'Все чаты';
  private readonly _id: string = '';
  private users: User[] = [];
  private chats: Chat[] = [];
  private currentChat: Chat;

  constructor(res: SpaseChat) {
    this.title = res.title;
    this._id = res._id;
    this.users = res.users;
    this.chats = res.chats;

  };

  public getTitle(): string {
    return this.title;
  };

  public getChatMainId(): string {
    return this._id;
  };

  public setChat(chats: Chat[]): ChatsModel {
    this.chats = chats;
    return this;
  };

  public deleteChat(_id: string): ChatsModel {
    this.chats = this.chats.filter((item: Chat) => item.getChatId() !== _id)
    return this;
  };

  public deleteUser(userId: string, chatId: string): ChatsModel {
    this.chats.find(item => item.getChatId() === chatId).deleteUserFromChat(userId);
    return this;
  };

  public addUser(userId: string, chatId: string): ChatsModel {
    this.chats.find(item => item.getChatId() === chatId).addUserInChat(userId);
    return this;
  };

  public setCurrentChat(chat: Chat): void {
    this.currentChat = chat;
  };

  public getChats(): Chat[] {
    return this.chats;
  };

}
