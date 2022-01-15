import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import {ModalService} from "./modal.service";
import {UserInfoResolver} from "../user-info/user-info.resolver";

@NgModule({
  declarations: [
    ModalComponent,
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule {
  public static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [
        ModalService,
        UserInfoResolver
      ],
    }
  }
}
