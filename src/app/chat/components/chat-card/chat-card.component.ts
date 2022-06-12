import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {SpaseChat} from "../../interface/space-chat";

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatCardComponent {

  @Input() public chat: SpaseChat;
  @Output() onChoose: EventEmitter<SpaseChat> = new EventEmitter();

  public edit() {

  }

  public choose(chat: SpaseChat) {
    this.onChoose.emit(chat);
  }
}
