import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {SpaseChat} from "../../interface/space-chat";
import {ChatMainModel} from "../../models/chat-main.model";

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatCardComponent {

  @Input() public chat: ChatMainModel;
  @Output() onChoose: EventEmitter<ChatMainModel> = new EventEmitter();

  public edit() {

  }

  public choose(chat: ChatMainModel) {
    this.onChoose.emit(chat);
  }
}
