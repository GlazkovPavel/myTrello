import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpChatService} from "../../../services/http-chat.service";
import {ChatService} from "../../../services/chat.service";
import {ErrorModel} from "../../../../shared/error/models/error.model";
import {Chat} from "../../../models/chat.model";
import {Observable} from "rxjs";
import {ChatModelArray} from "../../side-panel/side-panel.component";
import {ChatMainModel} from "../../../models/chat-main.model";
import {ISpaceChatResponse} from "../../../interface/space-chat-response";
import {IChats} from "../../../interface/chats";

@Component({
  selector: 'app-chat-cards-item',
  templateUrl: './chat-cards-item.component.html',
  styleUrls: ['./chat-cards-item.component.scss']
})
export class ChatCardsItemComponent implements OnInit {

  @Input() public chat: Chat;
  @Input() public currentChatId: string;
  @Output() onChoose: EventEmitter<Chat> = new EventEmitter();
  public title: string;
  public chatModel$: Observable<ChatModelArray>;

  constructor(
    private httpChatService: HttpChatService,
    private chatService: ChatService) {
  }
  ngOnInit(): void {
    this.title = this.chat?.getChatTitle();
    this.isActiveChat();
    this.chatModel$ = this.chatService.getChatRooms();
  }

  public edit() {

  }

  public choose(chat: Chat) {
    this.onChoose.emit(chat);
  }

  public deleteChat(chat: Chat) {
    this.httpChatService.deleteChat(chat).subscribe(
      () => {
        this.chatService.deleteChat(chat.getChatId());
      },
      (err: ErrorModel) => {
        console.log('Упал deleteChatSpace', err);
      }
    );
  }

  public isActiveChat(): boolean {
    return this.chat.getChatId() === this.currentChatId;
  }

  public addChatInRoom(chat: Chat, chatMain: ChatMainModel): void {
    this.httpChatService.addChatInRoom(chat, chatMain).subscribe(
      (res: ISpaceChatResponse) => {
        const chatsArray: Chat[] = res.chats.map((item: IChats) => new Chat(item));

        const chatMainModel = new ChatMainModel({
          _id: res._id,
          title: res.title,
          users: res.userIds,
          chats: chatsArray,
        })
        console.log(chatMainModel);

        this.chatService.updateSpaceChat(chatMainModel);
      },
      (err: ErrorModel) => {
        console.log('Упал addChatInRoom', err);
      }
    )
  }

  public deleteChatInRoom(chat: Chat): void {
    const chatMain = this.chatService.getChat();
    this.httpChatService.deleteChatInRoom(chat, chatMain).subscribe(
      (res: ISpaceChatResponse) => {
        const chatsArray: Chat[] = res.chats.map((item: IChats) => new Chat(item));

        const chatMainModel = new ChatMainModel({
          _id: res._id,
          title: res.title,
          users: res.userIds,
          chats: chatsArray,
        })
        console.log(chatMainModel);

        this.chatService.updateSpaceChat(chatMainModel);
      },
      (err: ErrorModel) => {
        console.log('Упал deleteChatInRoom', err);
      }
    )
  }

  public isAllChat(): boolean {
    return this.chatService.isAllChats();
  }
}
