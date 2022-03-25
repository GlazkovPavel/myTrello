import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.component";
import {RouterModule} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MomentPipeModule} from "../shared/pipes/moment.module";


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MomentPipeModule,
    RouterModule,
    MatTooltipModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
