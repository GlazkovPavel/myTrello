import {ISpaceChatResponse} from "./space-chat-response";
import {IChats} from "./chats";

export interface IInitialization {
  rooms: ISpaceChatResponse[],
  chats: IChats[]
}
