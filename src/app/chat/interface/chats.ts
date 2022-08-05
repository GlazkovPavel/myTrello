import {User} from "./user.interface";
import {EChat} from "../enum/chat";

export interface IChats {
  title: string;
  _id?: string,
  kind: EChat;
  users?: string[];
  chatInitiator?: string,

}
