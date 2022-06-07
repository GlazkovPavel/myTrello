import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClickDirective} from "./cliick.directive";
import {MouseoverDirective} from "./mouseover.directive";
import {MousedownDirective} from "./mousedown.directive";
import {UsernameValidatorDirective} from "./usernameValidator.directive";

@NgModule({
  declarations: [
    MouseoverDirective,
    ClickDirective,
    MousedownDirective,
    UsernameValidatorDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickDirective,
    MouseoverDirective,
    MousedownDirective,
    UsernameValidatorDirective,
  ]
})
export class DirectiveModule { }
