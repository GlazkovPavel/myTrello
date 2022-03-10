import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoComponent} from "../component/todo.component";
import {TodoService} from "../services/todo.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [TodoComponent],
  exports: [
    TodoComponent
  ],
  providers: [TodoService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TodoModule { }
