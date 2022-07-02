import {EChat} from "../enum/chat";
import {User} from "./user.interface";
import {IChats} from "./chats";

export interface ISpaceChatResponse {
  title: string;
  _id?: string,
  kind: EChat;
  users?: User[];
  chats?: IChats[];

}
