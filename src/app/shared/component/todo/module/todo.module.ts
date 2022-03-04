import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoComponent} from "../component/todo.component";
import {TodoService} from "../services/todo.service";

@NgModule({
  declarations: [TodoComponent],
  exports: [
    TodoComponent
  ],
  providers: [TodoService],
  imports: [
    CommonModule
  ]
})
export class TodoModule { }
