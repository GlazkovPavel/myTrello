import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TUI_SANITIZER, TuiDialogModule, TuiNotificationsModule, TuiRootModule} from "@taiga-ui/core";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {ListComponent} from './field/list/list.component';
import {CardComponent} from './field/card/card.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {FooterComponent} from './footer/footer.component';
import {FieldComponent} from './field/field.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListDefaultComponent} from './field/list-default/list-default.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home.component';
import {WidgetsTaskTodayComponent} from './widgets/widgets-task-today/widgets-task-today.component';
import {WidgetImportantTaskComponent} from './widgets/widget-important-task/widget-important-task.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {SidePanelComponent} from './field/side-panel/side-panel.component';
import {SidePanelCardComponent} from './field/side-panel/side-panel-card/side-panel-card.component';
import {SignInComponent} from './authorization/sign-in/sign-in.component';
import {SignUpComponent} from './authorization/sign-up/sign-up.component';
import {MainLayoutComponent} from './shared/component/main-layout/main-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule} from "@angular/material/stepper";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatIconModule} from "@angular/material/icon";
import {ModalModule} from "./modal/modal.module";
import {UserCheckService} from "./user-info/user.service";
import {ValidationService} from "./shared/services/validation.service";
import {MatLegacyTooltipModule as MatTooltipModule} from "@angular/material/legacy-tooltip";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {WidgetImgComponent} from './widgets/widget-img/widget-img.component';
import {CardEditComponent} from "./field/card/card-edit/card-edit.component";
import {CurrentCardComponent} from './field/side-panel/side-panel-card/current-card/current-card.component';
import {BoardHeaderComponent} from "./field/board-header/board-header.component";
import {UsersService} from "./shared/services/users.service";
import {TodoModule} from "./shared/component/todo/module/todo.module";
import {MessageModule} from "./shared/component/message/message.module";
import {HeaderModule} from "./header/header.module";
import {MomentPipeModule} from "./shared/pipes/moment.module";
import {MaskModule} from "./mask/mask.module";
import {DirectiveModule} from "./shared/directives/directive.module";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListComponent,
    CardComponent,
    NotFoundComponent,
    FooterComponent,
    FieldComponent,
    ListDefaultComponent,
    HomeComponent,
    WidgetsTaskTodayComponent,
    WidgetImportantTaskComponent,
    SidePanelComponent,
    SidePanelCardComponent,
    SignInComponent,
    SignUpComponent,
    MainLayoutComponent,
    WidgetImgComponent,
    CardEditComponent,
    CurrentCardComponent,
    BoardHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ModalModule.forRoot(),
    MatTooltipModule,
    MatButtonToggleModule,
    TodoModule,
    MessageModule,
    HeaderModule,
    MaskModule,
    MomentPipeModule,
    TuiRootModule,
    TuiDialogModule,
    DirectiveModule,
    TuiNotificationsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot([])
  ],
  providers: [UserCheckService, ValidationService, ListComponent, UsersService, {
    provide: TUI_SANITIZER,
    useClass: NgDompurifySanitizer
  }],
  exports: [
    FooterComponent,
    SidePanelComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
