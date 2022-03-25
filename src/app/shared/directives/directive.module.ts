import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClickDirective} from "./cliick.directive";

@NgModule({
  declarations: [ClickDirective],
  imports: [
    CommonModule
  ],
  exports: []
})
export class DirectiveModule { }
