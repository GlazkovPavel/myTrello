import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/guard/auth.guard";
import {CalendarComponent} from "./calendar.component";
import {AlmanacComponent} from "./almanac/almanac.component";
import {OrzanaizerComponent} from "./orzanaizer/orzanaizer.component";
import {SelectorComponent} from "./selector/selector.component";
import {HeaderModule} from "../header/header.module";
import {MomentPipeModule} from "../shared/pipes/moment.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CalendarComponent,
    AlmanacComponent,
    OrzanaizerComponent,
    SelectorComponent,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    MomentPipeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarComponent,
        canActivate: [AuthGuard]
      }
    ]),
  ]
})
export class CalendarModule { }
