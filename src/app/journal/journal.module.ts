import { NgModule } from '@angular/core';
import {JournalComponent} from "./journal.component";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/guard/auth.guard";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HeaderModule} from "../header/header.module";
import {MomentPipeModule} from "../shared/pipes/moment.module";
import {DirectiveModule} from "../shared/directives/directive.module";


@NgModule({
  declarations: [
    JournalComponent,
  ],
  exports: [
    JournalComponent
  ],
  imports: [
    HeaderModule,
    MomentPipeModule,
    DirectiveModule,
    CommonModule,
    AngularEditorModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: JournalComponent,
        canActivate: [AuthGuard]
      }
    ]),
  ]
})
export class JournalModule { }
