import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from './field/list/list.component';
import { CardComponent } from './field/card/card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { FieldComponent } from './field/field.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ListDefaultComponent } from './field/list-default/list-default.component';
import {ClickDirective} from "./shared/directives/cliick.directive";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { CalendarComponent } from './calendar/calendar.component';
import { SelectorComponent } from './calendar/selector/selector.component';
import { AlmanacComponent } from './calendar/almanac/almanac.component';
import {MomentPipe} from "./shared/pipes/moment.pipe";
import { OrzanaizerComponent } from "./calendar/orzanaizer/orzanaizer.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { TimePipe } from "./shared/pipes/time.pipe";
import { WidgetsTaskTodayComponent } from './widgets/widgets-task-today/widgets-task-today.component';
import { WidgetImportantTaskComponent } from './widgets/widget-important-task/widget-important-task.component';
import { AngularEditorModule } from "@kolkov/angular-editor";
import { SidePanelComponent } from './field/side-panel/side-panel.component';
import { SidePanelCardComponent } from './field/side-panel/side-panel-card/side-panel-card.component';
import { SignInComponent } from './authorization/sign-in/sign-in.component';
import { SignUpComponent } from './authorization/sign-up/sign-up.component';
import { MainLayoutComponent } from './shared/component/main-layout/main-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ModalModule} from "./modal/modal.module";
import {JournalComponent} from "./journal/journal.component";
import { UsernameValidatorDirective } from './shared/directives/usernameValidator.directive';
import {UserService} from "./user-info/user.service";
import {ValidationService} from "./shared/services/validation.service";
import {HeaderComponent} from "./header/header.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MousedownDirective} from './shared/directives/mousedown.directive';
import { WidgetImgComponent } from './widgets/widget-img/widget-img.component';
import {CardEditComponent} from "./field/card/card-edit/card-edit.component";
import { CurrentCardComponent } from './field/side-panel/side-panel-card/current-card/current-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListComponent,
    CardComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    FieldComponent,
    ListDefaultComponent,
    ClickDirective,
    MousedownDirective,
    JournalComponent,
    CalendarComponent,
    OrzanaizerComponent,
    SelectorComponent,
    AlmanacComponent,
    MomentPipe,
    TimePipe,
    HomeComponent,
    WidgetsTaskTodayComponent,
    WidgetImportantTaskComponent,
    SidePanelComponent,
    SidePanelCardComponent,
    SignInComponent,
    SignUpComponent,
    MainLayoutComponent,
    UsernameValidatorDirective,
    WidgetImgComponent,
    CardEditComponent,
    CurrentCardComponent
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
    ],
  providers: [UserService, ValidationService, ListComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    MomentPipe,
    UsernameValidatorDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
