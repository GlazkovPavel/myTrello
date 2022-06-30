import {User} from "./user.interface";
import {EChat} from "../enum/chat";

export interface Chats {
  title: string;
  _id?: string,
  kind: EChat;
  users?: User[];

}
