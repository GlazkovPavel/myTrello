import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SpaseChat} from "../../interface/space-chat";
import {EChat} from "../../enum/chat";
import {catchError, map, startWith} from "rxjs/operators";
import {UnSubscriber} from "../../../shared/utils/unsubscriber";
import {ChatService} from "../../services/chat.service";
import {Observable, of} from "rxjs";
import {IModelItem} from "../../../shared/error/models/models.model";
import {ChatMainModel} from "../../models/chat-main.model";
import {accounts} from "../../utils/kind-chat";
import {IChats} from "../../interface/chats";
import {HttpChatService} from "../../services/http-chat.service";
import {Chat} from "../../models/chat.model";
import {ISpaceChatResponse} from "../../interface/space-chat-response";
import {State} from "../../../shared/enum/state";
import {ErrorModel} from "../../../shared/error/models/error.model";

export type ChatModelArray = IModelItem<ChatMainModel[]>;
export type ChatModelItem = IModelItem<ChatMainModel>;

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelComponent extends UnSubscriber implements OnInit {
  @ViewChild('accordion') private accordion: any;
  public panelOpenState: boolean = false;
  private chooseChatMainId: string = '';
  public accounts: any;
  public title: string = '';
  public chatModel$: Observable<ChatModelArray>;
  public chatModelItem$: Observable<ChatModelItem>;

  public testForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    accounts: new FormControl(accounts[0], [
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
    if (this.chatService?.cashChats[0]?.getTitle()) {
      this.title = this.chatService.cashChats[0].getTitle();
      this.chatService.setChat(this.chatService.cashChats[0]);
      this.chatModelItem$ = this.getChatModelItem();
    } else {this.title = 'Создайте рабочее пространство'}

    this.accounts = accounts;
  }

  public get isActive(): string {
    return this.chatService.getChat().getChatMainId();
  }

  public getChatModelItem(): Observable<ChatModelItem> {
    return this.chatService.chat$.pipe(
      map((item: ChatMainModel) => ({
        state: State.READY,
        item,
      })),
      startWith({state: State.PENDING}),
      catchError((ex: ErrorModel) =>
        of({
          state: State.ERROR,
          error: ex,
        }),
      ),
    );
  }


  public onSubmit() {
    const a = this.testForm.controls['name'].value
    const b = this.testForm.controls['accounts'].value
    const chat: SpaseChat = {
      title: a,
      kind: b === 'Общедоступный' ? EChat.PUBLIC : EChat.PRIVATE,
    };
    this.httpChatService.createChatRoom(chat).subscribe(
      (res: ISpaceChatResponse) => {
        const chatsArray: Chat[] = res.chats.map((chat:IChats ) => new Chat(chat));

        const chatMainModel = new ChatMainModel({
          _id: res._id,
          kind: res.kind,
          title: res.title,
          users: res.users,
          chats: chatsArray,
        })
        this.chatService.setCashChat(chatMainModel);
        this.onChoose(chatMainModel);
      }
    );
    this.testForm.reset();
    this.accordion.close();
  }

  public onClose(): void {
    this.testForm.controls['name'].reset();
    this.accordion.close();
  }

  public onChoose(chat: ChatMainModel) {
    this.title = chat.getTitle();
    this.chatService.setChat(chat);
    this.chooseChatMainId = chat.getChatMainId();
    this.accordion.close();
    this.changeDetectorRef.markForCheck();
  }

  public onCloseAccordion(): void {
    this.accordion.close();
  }
  public onToggleAccordion(): void {
    setTimeout(() => {
      this.panelOpenState = !this.panelOpenState;

    }, 0)
  }
}
