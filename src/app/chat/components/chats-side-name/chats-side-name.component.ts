import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {Chat} from "../../models/chat.model";
import {EChat} from "../../enum/chat";
import {accounts} from "../../utils/kind-chat";
import {IChats} from "../../interface/chats";
import {HttpChatService} from "../../services/http-chat.service";
import {SpaseChat} from "../../interface/space-chat";
import {IModelItem} from "../../../shared/error/models/models.model";
import {ChatMainModel} from "../../models/chat-main.model";
import {State} from "../../../shared/enum/state";

@Component({
  selector: 'app-chats-side-name',
  templateUrl: './chats-side-name.component.html',
  styleUrls: ['./chats-side-name.component.scss']
})
export class ChatsSideNameComponent implements OnInit {

  @Input() public panelOpenState: boolean;
  @Input() public model: IModelItem<ChatMainModel>
  public state: typeof State = State;
  public accounts: any;
  public openForm: boolean = false;
  public chats: Chat[];

  constructor(
    private chatService: ChatService,
    private httpChatService: HttpChatService,
  ) { }

  public testForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
    accounts: new FormControl(accounts[0], [
      Validators.required,
    ]),
  });
  value = '';

  public ngOnInit(): void {
    this.accounts = accounts;
    this.chats = this.model.item.getChats();
  }

  public isChats(): boolean {
    return (!!this.chatService.cashChats.length);
  }

  public onClick() {
    if (!!this.testForm.controls['title']?.value) {
      this.onSubmit();
      this.openForm = !this.openForm;
    } else {
      this.openForm = !this.openForm;
    }
  }

  public onSubmit() {
    const chatMainId = this.chatService.getChat().getChatMainId()
    const kind: string = this.testForm.controls['accounts'].value
    const chat: IChats = {
      title: this.testForm.controls['title'].value,
      kind: kind === 'Общедоступный' ? EChat.PUBLIC : EChat.PRIVATE,
    }
    this.httpChatService.createChat(chat, chatMainId).subscribe(
      (value: SpaseChat) => {
        this.testForm.reset();
        this.openForm = !this.openForm;
         this.chatService.setCashChat(this.chatService.getChat().setChat(value.chats));

      },
      () => {

    })

  }

  onChoose($event: any) {

  }
}
