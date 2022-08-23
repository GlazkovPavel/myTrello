import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './components/chat/chat.component';
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/guard/auth.guard";
import {HeaderModule} from "../header/header.module";
import {ChatService} from "./services/chat.service";
import {SocketService} from "./services/socket.service";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {DialogUserComponent} from './components/dialog-user/dialog-user.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreUserService} from "./services/store-user-service";
import {MaskModule} from "../mask/mask.module";
import {DirectiveModule} from "../shared/directives/directive.module";
import {MomentPipeModule} from "../shared/pipes/moment.module";
import {SidePanelComponent} from './components/side-panel/side-panel.component';
import {
  TuiAccordionModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMarkerIconModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {TuiButtonModule, TuiScrollbarModule, TuiSvgModule,} from "@taiga-ui/core";
import {ChatCardComponent} from "./components/chat-card/chat-card.component";
import {ChatResolver} from "./resolver/chat.resolver";
import {ChatsSideNameComponent} from './components/chats-side-name/chats-side-name.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {HttpChatService} from "./services/http-chat.service";
import {ChatCardsItemComponent} from './components/chats-side-name/chat-cards-item/chat-cards-item.component';
import {CardWithRoomsPipe} from "./pipes/cardWithRooms.pipe";

@NgModule({
  declarations: [
    ChatComponent,
    DialogUserComponent,
    SidePanelComponent,
    ChatCardComponent,
    ChatsSideNameComponent,
    ChatCardsItemComponent,
    CardWithRoomsPipe,
  ],
  providers: [
    ChatService,
    SocketService,
    StoreUserService,
    ChatResolver,
    HttpChatService,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatComponent,
        resolve: {chat: ChatResolver},
        canActivate: [AuthGuard],
      }
    ]),
    HeaderModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MaskModule,
    DirectiveModule,
    MomentPipeModule,
    TuiAccordionModule,
    TuiSvgModule,
    TuiSelectModule,
    TuiInputModule,
    TuiDataListWrapperModule,
    TuiButtonModule,
    TuiMarkerIconModule,
    MatExpansionModule,
    MatSelectModule,
    TuiScrollbarModule,
  ]
})

export class ChatModule {
}
