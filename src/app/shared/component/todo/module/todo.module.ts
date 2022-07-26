import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoComponent} from "../component/todo.component";
import {TodoService} from "../services/todo.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {KEY, todoReducer} from "../store/reducers/todo.reducer";
import {STORE_KEY} from "../store/utils/key";
import {TodoEffect} from "../store/effects/todo.effect";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [TodoComponent],
  exports: [
    TodoComponent,
  ],
  providers: [TodoService],
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    EffectsModule.forFeature([TodoEffect]),
    StoreModule.forFeature(STORE_KEY, {
      [KEY]: todoReducer,
    }),
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class TodoModule {
}
