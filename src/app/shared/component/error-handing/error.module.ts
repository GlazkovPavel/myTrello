import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandingComponent } from './component/error-handing.component';
import {ErrorService} from "./services/error.service";
import {GetMessageErrorService} from "./services/get-message-error.service";



@NgModule({
  declarations: [
    ErrorHandingComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ErrorService,
    GetMessageErrorService
  ]
})
export class ErrorModule { }
