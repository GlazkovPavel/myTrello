import {ChangeDetectionStrategy, Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {Chat} from "../../models/chat.model";
import {EChat} from "../../enum/chat";
import {accounts} from "../../utils/kind-chat";
import {IChats} from "../../interface/chats";
import {HttpChatService} from "../../services/http-chat.service";
import {IModelItem} from "../../../shared/error/models/models.model";
import {ChatMainModel} from "../../models/chat-main.model";
import {State} from "../../../shared/enum/state";
import {ISpaceChatResponse} from "../../interface/space-chat-response";

@Component({
  selector: 'app-chats-side-name',
  templateUrl: './chats-side-name.component.html',
  styleUrls: ['./chats-side-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsSideNameComponent implements OnInit, DoCheck {

  @Input() public panelOpenState: boolean;
  @Input() public model: IModelItem<ChatMainModel>
  public state: typeof State = State;
  public accounts: any;
  public openForm: boolean = false;
  public chats: Chat[];
  public cashChats: Chat[];
  public currentChat: Chat;

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
    this.chats = this.model?.item.getChats();
    this.cashChats = this.chats;
    this.currentChat = this.chats[0];
  }

  public ngDoCheck(): void {
    if (this.cashChats !== this.model?.item.getChats()) {
      this.chats = this.model?.item.getChats();
      this.cashChats = this.chats;
       this.currentChat = this.model.item.getChats()[0];
    }
  }

  public get currentChatId(): string {
    return this.currentChat.getChatId();
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
      (res: ISpaceChatResponse) => {
        this.testForm.reset();
        this.openForm = !this.openForm;
        const chatsArray: Chat[] = res.chats.map((chat: IChats) => new Chat(chat));
        const spaseChat: ChatMainModel = new ChatMainModel({
          _id: res._id,
          title: res.title,
          chats: chatsArray,
          users: res.users,
          kind: res.kind,
        })
          this.chatService.setChat(spaseChat);
          this.openForm = !this.openForm;

      },
      () => {
        this.openForm = !this.openForm;
    })

  }

  onChoose(chat: Chat) {
    this.currentChat = chat;
  }
}
