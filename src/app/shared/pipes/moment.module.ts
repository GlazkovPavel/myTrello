import { NgModule } from '@angular/core';
import {MomentPipe} from "./moment.pipe";
import {TimePipe} from "./time.pipe";



@NgModule({
  declarations: [
    MomentPipe,
    TimePipe,
  ],
  imports: [],
  exports:[
    MomentPipe,
    TimePipe
  ]
})
export class MomentPipeModule { }
