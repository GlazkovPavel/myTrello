import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoComponent} from "../component/todo.component";
import {TodoService} from "../services/todo.service";
import {FormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [TodoComponent],
  exports: [
    TodoComponent
  ],
  providers: [TodoService],
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TodoModule { }
