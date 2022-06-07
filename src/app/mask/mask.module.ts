import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaskComponent} from "./mask.component";
import {UserCardComponent} from "./user-card/user-card/user-card.component";
import {DirectiveModule} from "../shared/directives/directive.module";

@NgModule({
  declarations: [
    MaskComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    DirectiveModule
  ],
  exports: [
    MaskComponent,
    UserCardComponent]
})
export class MaskModule { }
