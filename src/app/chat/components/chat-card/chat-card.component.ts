import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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
export class ChatCardComponent {

  @Input() public chat: ChatMainModel;
  @Output() onChoose: EventEmitter<ChatMainModel> = new EventEmitter();
  @Output() onCloseAccordion: EventEmitter<void> = new EventEmitter();

  constructor(
    private httpChatService: HttpChatService,
    private chatService: ChatService) {
  }

  public edit() {

  }

  public choose(chat: ChatMainModel) {
    this.onChoose.emit(chat);
  }

  public deleteChatSpace(chat: ChatMainModel) {
    const idChatSpace: string = chat.getChatMainId();
    this.httpChatService.deleteChatSpace(idChatSpace).subscribe(
      () => {
        this.chatService.deleteChatSpace(idChatSpace);
        this.onCloseAccordion.emit();
      },
      (err: ErrorModel) => {
        console.log('Упал deleteChatSpace', err);
      }
    );
  }
}
