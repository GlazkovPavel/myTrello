import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {Chat} from "../../models/chat.model";
import {EChat} from "../../enum/chat";
import {accounts} from "../../utils/kind-chat";

@Component({
  selector: 'app-chats-side-name',
  templateUrl: './chats-side-name.component.html',
  styleUrls: ['./chats-side-name.component.scss']
})
export class ChatsSideNameComponent implements OnInit {

  @Input() public panelOpenState: boolean;
  public accounts: any;
  public openForm: boolean = false;

  constructor(
    private chatService: ChatService
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
    const chat: Chat = new Chat({
      title: this.testForm.controls['title'].value,
      kind: this.testForm.controls['accounts'].value
    })
    console.log(chat)
  }
}
