import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SpaseChat} from "../../interface/space-chat";
import {UnSubscriber} from "../../../shared/utils/unsubscriber";
import {ChatService} from "../../services/chat.service";
import {Observable} from "rxjs";
import {IModelItem} from "../../../shared/error/models/models.model";
import {ChatMainModel} from "../../models/chat-main.model";
import {IChats} from "../../interface/chats";
import {HttpChatService} from "../../services/http-chat.service";
import {Chat} from "../../models/chat.model";
import {ISpaceChatResponse} from "../../interface/space-chat-response";
export type ChatModelArray = IModelItem<ChatMainModel[]>;
export type ChatModelItem = IModelItem<ChatMainModel>;

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelComponent extends UnSubscriber implements OnInit {
  @Output() public nameChat: EventEmitter<string> = new EventEmitter();
  public title: string = '';
  public chatModel$: Observable<ChatModelArray>;
  public openForm: boolean = false;

  public testForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private chatService: ChatService,
    private httpChatService: HttpChatService,
    private changeDetectorRef: ChangeDetectorRef,
    ) {
    super();
  }


  public ngOnInit(): void {
    this.chatModel$ = this.chatService.getChatRooms();
   }

  public get isActive(): string {
    return this.chatService.getChat().getChatMainId();
  }

  public onSubmit() {
    if (!!this.testForm.controls['title']?.value) {
      const title = this.testForm.controls['title'].value
      const chat: SpaseChat = {
        title,
      };
      this.httpChatService.createChatRoom(chat).subscribe(
        (res: ISpaceChatResponse) => {
          const chatsArray: Chat[] = res.chats.map((chat: IChats) => new Chat(chat));

          const chatMainModel = new ChatMainModel({
            _id: res._id,
            title: res.title,
            users: res.userIds,
            chats: chatsArray,
          })
          this.chatService.setCashChat(chatMainModel);
          this.onChoose(chatMainModel);
        }
      );
      this.testForm.reset();
      this.openForm = !this.openForm;
    } else {
      this.openForm = !this.openForm;
    }
  }

  public onClick() {
    if (!!this.testForm.controls['title']?.value) {
      this.onSubmit();
    } else {
      this.openForm = !this.openForm;
    }
  }

  public onChoose(chat: ChatMainModel) {
    this.title = chat.getTitle();
    this.chatService.setChat(chat, true);
    this.chatService.usersWorkSpaceOwner$.next(true);

    if (chat?.getChats().length > 0) {
      this.titleChat(chat.getChats()[0].getChatTitle());
    } else { this.titleChat('')}
    this.changeDetectorRef.markForCheck();
  }

  public titleChat(title: string): void {
    this.nameChat.next(title)
  }
}
