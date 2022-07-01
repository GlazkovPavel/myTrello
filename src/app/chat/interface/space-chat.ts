import {EChat} from "../enum/chat";
import {User} from "./user.interface";
import {Chat} from "../models/chat.model";

export interface SpaseChat {
  title: string;
  _id?: string,
  kind: EChat;
  users?: User[];
  chats?: Chat[];

}
