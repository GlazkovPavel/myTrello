import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/guard/auth.guard";
import {HeaderModule} from "../header/header.module";

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatComponent,
        canActivate: [AuthGuard]
      }
    ]),
    HeaderModule
  ]
})
export class ChatModule { }
