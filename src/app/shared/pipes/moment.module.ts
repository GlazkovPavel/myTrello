import { NgModule } from '@angular/core';
import {MomentPipe} from "./moment.pipe";
import {TimePipe} from "./time.pipe";
import {FilterSelfPipe} from "./filter-self.pipe";



@NgModule({
  declarations: [
    MomentPipe,
    TimePipe,
    FilterSelfPipe,
  ],
  imports: [],
  exports:[
    MomentPipe,
    TimePipe,
    FilterSelfPipe
  ]
})
export class MomentPipeModule { }
