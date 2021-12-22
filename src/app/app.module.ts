import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from './field/list/list.component';
import { CardComponent } from './field/card/card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FieldComponent } from './field/field.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ListDefaultComponent } from './field/list-default/list-default.component';
import {ClickDirective} from "./directives/cliick.directive";
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
import { JournalComponent } from './journal/journal.component';
import { AngularEditorModule } from "@kolkov/angular-editor";

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
    CalendarComponent,
    OrzanaizerComponent,
    SelectorComponent,
    AlmanacComponent,
    MomentPipe,
    TimePipe,
    HomeComponent,
    WidgetsTaskTodayComponent,
    WidgetImportantTaskComponent,
    JournalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
