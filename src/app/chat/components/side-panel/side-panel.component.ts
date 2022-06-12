import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SpaseChat} from "../../interface/space-chat";
import {EChat} from "../../enum/chat";
import {map, takeUntil} from "rxjs/operators";
import {IdGeneratorService} from "../../../shared/services/id-generator.service";
import {UnSubscriber} from "../../../shared/utils/unsubscriber";
import {ChatService} from "../../services/chat.service";


class Account {
  constructor(readonly name: string) {}

  toString(): string {
    return `${this.name}`;
  }
}

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelComponent extends UnSubscriber implements OnInit {
  public openPopup: boolean = false;
  private id: string = '';
  readonly accounts = [
    new Account('Общедоступный'),
    new Account('Приватный'),
  ];

  public title: string = '';
  readonly chats: SpaseChat[] = [{
    title: 'SpaseChat 1',
    id: '1',
    kind: EChat.PUBLIC,
    chats: {
      title: 'Первый чатик',
      users: [
        {
          id: 123456,
          name: 'Pavel'
        }
      ]
    }
  },
    {
      title: 'SpaseChat 2',
      id: '2',
      kind: EChat.PUBLIC,
      chats: {
        title: 'Второй чатик',
        users: [
          {
            id: 123456,
            name: 'Pavel'
          }
        ]
      }
    }];


  testForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    accounts: new FormControl(this.accounts[0], [
      Validators.required,
    ]),
  });

  constructor(
    private idGeneratorService: IdGeneratorService,
    private chatService: ChatService,
    ) {
    super();
  }

  public ngOnInit(): void {
    this.title = this.chats[0].title;
  }


  public onSubmit() {
    this.idGeneratorService.onId()
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((item: string) => this.id = item);
    const a = this.testForm.controls['name'].value
    const b = this.testForm.controls['accounts'].value.name
    const chat: SpaseChat = {
      title: a,
      id: this.id,
      kind: b === 'Общедоступный' ? EChat.PUBLIC : EChat.PRIVATE,
    };
    this.chatService.createChat(chat).subscribe();
    this.testForm.controls['name'].reset();
    this.openPopup = true;
    setTimeout(() => {
      this.openPopup = false;
    }, 0);  }

  public onClose(): void {
    this.testForm.controls['name'].reset();
    this.openPopup = true;
    setTimeout(() => {
      this.openPopup = false;
    }, 0);
  }

  public onChoose(chat: SpaseChat) {
    this.title = this.chats.find((item: SpaseChat) => item.id === chat.id).title
  }
}
