import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatMainModel} from "../../models/chat-main.model";
import {HttpChatService} from "../../services/http-chat.service";
import {ChatService} from "../../services/chat.service";
import {ErrorModel} from "../../../shared/error/models/error.model";

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatCardComponent implements OnInit {

  @Input() public chat: ChatMainModel;
  @Input() public isActive: string = '';
  @Output() onChoose: EventEmitter<ChatMainModel> = new EventEmitter();
  constructor(
    private httpChatService: HttpChatService,
    private chatService: ChatService) {
  }
  ngOnInit(): void {
    this.isActive = this.chatService.chat$.getValue().getChatMainId();
    this.isActiveChat();
  }

  public edit() {

  }

  public isActiveChat(): boolean {
    return this.chat?.getChatMainId() === this.isActive;
  }

  public deleteChatSpace(chat: ChatMainModel) {
    const idChatSpace: string = chat.getChatMainId();
    this.httpChatService.deleteChatSpace(idChatSpace).subscribe(
      () => {
        this.chatService.deleteChatSpace(idChatSpace);
      },
      (err: ErrorModel) => {
        console.log('Упал deleteChatSpace', err);
      }
    );
  }


  public choose(chat: ChatMainModel) {
    this.onChoose.emit(chat);
  }

  public isAllChats(): boolean {
    return this.chatService.isAllChats();
  }
}
