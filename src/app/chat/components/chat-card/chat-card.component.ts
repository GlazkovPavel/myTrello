import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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

  public get isActive(): boolean {
    return this.chatService.getChat().getChatMainId() === this.chat.getChatMainId();
  }

  @Input() public chat: ChatMainModel;
 // @Output() onChoose: EventEmitter<ChatMainModel> = new EventEmitter();
  @Output() onCloseAccordion: EventEmitter<void> = new EventEmitter();
  //public isActive: boolean = false;
  constructor(
    private httpChatService: HttpChatService,
    private chatService: ChatService) {
  }
  ngOnInit(): void {
    //this.
  }

  public edit() {

  }

  // public isActive(): boolean {
  //   return this.chatService.getChat().getChatMainId() === this.chat.getChatMainId();
  // }

  public choose(chat: ChatMainModel) {
    !this.isActive;
    //this.onChoose.emit(chat);
    // this.chatMainId = '';
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
