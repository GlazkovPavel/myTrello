import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SpaseChat} from "../../interface/space-chat";
import {EChat} from "../../enum/chat";
import {takeUntil} from "rxjs/operators";
import {IdGeneratorService} from "../../../shared/services/id-generator.service";
import {UnSubscriber} from "../../../shared/utils/unsubscriber";
import {ChatService} from "../../services/chat.service";
import {Observable} from "rxjs";
import {IModelItem} from "../../../shared/error/models/models.model";
import {ChatMainModel} from "../../models/chat-main.model";
import {accounts} from "../../utils/kind-chat";
import {IChats} from "../../interface/chats";
import {HttpChatService} from "../../services/http-chat.service";

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
  public panelClose: boolean = false;
  private id: string = '';
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
    private idGeneratorService: IdGeneratorService,
    private chatService: ChatService,
    private httpChatService: HttpChatService,
    ) {
    super();
  }


  public ngOnInit(): void {
    this.chatModel$ = this.chatService.getChatRooms();
    if (this.chatService?.cashChats[0]?.getTitle()) {
      this.title = this.chatService.cashChats[0].getTitle();
      this.chatService.setChat(this.chatService.cashChats[0]);
      this.chatModelItem$ = this.chatService.getChatModelItem();
    } else {this.title = 'Создайте рабочее пространство'}

    this.accounts = accounts;
  }


  public onSubmit() {
    this.idGeneratorService.onId()
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((item: string) => this.id = item);
    const a = this.testForm.controls['name'].value
    const b = this.testForm.controls['accounts'].value
    const chat: SpaseChat = {
      title: a,
      kind: b === 'Общедоступный' ? EChat.PUBLIC : EChat.PRIVATE,
    };
    this.httpChatService.createChatRoom(chat).subscribe(
      (res: IChats) => {
        const chatMainModel = new ChatMainModel({
          _id: res._id,
          kind: res.kind,
          title: res.title,
          users: res.users
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
  }
}
