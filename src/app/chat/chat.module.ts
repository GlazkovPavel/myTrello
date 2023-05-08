import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './components/chat/chat.component';
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/guard/auth.guard";
import {HeaderModule} from "../header/header.module";
import {ChatService} from "./services/chat.service";
import {SocketService} from "./services/socket.service";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {DialogUserComponent} from './components/dialog-user/dialog-user.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
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
  TuiSelectModule, TuiTextAreaModule
} from "@taiga-ui/kit";
import {TuiButtonModule, TuiScrollbarModule, TuiSvgModule,} from "@taiga-ui/core";
import {ChatCardComponent} from "./components/chat-card/chat-card.component";
import {ChatResolver} from "./resolver/chat.resolver";
import {ChatsSideNameComponent} from './components/chats-side-name/chats-side-name.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {HttpChatService} from "./services/http-chat.service";
import {ChatCardsItemComponent} from './components/chats-side-name/chat-cards-item/chat-cards-item.component';
import {CardWithRoomsPipe} from "./pipes/cardWithRooms.pipe";
import {MatLegacyTooltipModule as MatTooltipModule} from "@angular/material/legacy-tooltip";
import { MessageComponent } from './components/dialog-user/message/message.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {TuiEditorModule, TuiEditorNewModule} from "@taiga-ui/addon-editor";
import {CheckColumnsService} from "./services/check-columns.service";

@NgModule({
  declarations: [
    ChatComponent,
    DialogUserComponent,
    SidePanelComponent,
    ChatCardComponent,
    ChatsSideNameComponent,
    ChatCardsItemComponent,
    CardWithRoomsPipe,
    MessageComponent,
  ],
  providers: [
    ChatService,
    SocketService,
    StoreUserService,
    ChatResolver,
    HttpChatService,
    CheckColumnsService,
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
    MatTooltipModule,
    AngularEditorModule,
    TuiTextAreaModule,
    TuiEditorModule,
    TuiEditorNewModule,
  ]
})

export class ChatModule {
}
