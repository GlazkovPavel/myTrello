import {EChat} from "../enum/chat";
import {Chats} from "./chats";
import {User} from "./user.interface";

export interface SpaseChat {
  title: string;
  id: string,
  kind: EChat;
  users?: User;
  chats?: Chats;

}
