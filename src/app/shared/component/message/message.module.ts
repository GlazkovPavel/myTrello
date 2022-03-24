import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageService} from "./services/message.service";
import {GetMessageService} from "./services/get-message.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MessageService,
    GetMessageService
  ]
})
export class MessageModule { }
