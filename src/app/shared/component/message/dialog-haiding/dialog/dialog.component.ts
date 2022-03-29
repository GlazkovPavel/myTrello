import {Component, NgModule, OnInit} from '@angular/core';
import {IMessageInterface} from "../../interfaces/message.interface";
import {ModalService} from "../../../../../modal/modal.service";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {map} from "rxjs/operators";
import {FieldComponent} from "../../../../../field/field.component";
import {WorkSpaceService} from "../../../../services/work-space.service";
import {GetMessageService} from "../../services/get-message.service";
import {MessageEnum} from "../../enum/message.enum";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public message: IMessageInterface;
  private method: string;
  private id: string;

  constructor(private readonly modalService: ModalService,
              private readonly fieldService: FieldComponent,
              private readonly workSpaceService: WorkSpaceService,
              private readonly getMessageErrorService: GetMessageService) { }

  isClose() {
    this.modalService.close();
  }

  isConfirm() {

    if(this.method === 'handleDeleteSpaceId') {
      this.modalService.confirmSend(true);
      this.modalService.close();
      this.modalService.confirmSequence$.pipe(
        map((v:boolean) => {
         if(v.valueOf()) {
           this.workSpaceService.deleteWorkSpace(this.id).subscribe(
             () => {
               this.fieldService.deleteSpaceId(this.id);
             },
             (error) => {
               this.getMessageErrorService.showError(MessageEnum.MESSAGE_01);
               console.log(`Error: ${error.url}`, error);
             }
             )
         } })
      ).subscribe(
        {
          error: err => {
            this.getMessageErrorService.showError(MessageEnum.MESSAGE_01);
            console.log(`Error: ${err.url}`, err);
          }
        }
      )
    }
  }
}

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
})
export class DialogComponentModule {
}