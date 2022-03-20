import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandingComponent } from './component/error-handing.component';
import {ErrorService} from "./error.service";



@NgModule({
  declarations: [
    ErrorHandingComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ErrorService
  ]
})
export class ErrorModule { }
