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

  public isClose() {
    this.modalService.close();
  }

  public isConfirm() {

    if(this.method === 'handleDeleteSpaceId') {
      this.deleteSpaceId();
    }
    if(this.method === 'leaveWorkspace') {
      this.leaveWorkspace();
    }
  }

  private leaveWorkspace() {
    this.modalService.confirmSend(true);
    this.modalService.close();
    this.modalService.confirmSequence$.pipe(
      map((v:boolean) => {
        if(v.valueOf() && this.id) {
          const userId = JSON.parse(localStorage.getItem('userInfo'))._id

          this.workSpaceService.deleteUserWorkSpace(userId, this.id).subscribe(
            () => {
              this.fieldService.deleteSpaceId(this.id);
              this.id = null;
            },
            (error) => {
              this.getMessageErrorService.showError(MessageEnum.MESSAGE_01);
              this.id = null;
              console.log(`Error: ${error.url}`, error);
            }
          )
        } })
    ).subscribe(
      {
        error: err => {
          this.getMessageErrorService.showError(MessageEnum.MESSAGE_01);
          this.id = '';
          console.log(`Error: ${err.url}`, err);
        }
      }
    )
  }

  private deleteSpaceId() {
    this.modalService.confirmSend(true);
    this.modalService.close();
    this.modalService.confirmSequence$.pipe(
      map((v:boolean) => {
        if(v.valueOf() && this.id) {
          this.workSpaceService.deleteWorkSpace(this.id).subscribe(
            () => {
              this.fieldService.deleteSpaceId(this.id);
              this.id = null;
            },
            (error) => {
              this.getMessageErrorService.showError(MessageEnum.MESSAGE_01);
              this.id = null;
              console.log(`Error: ${error.url}`, error);
            }
          )
        } })
    ).subscribe(
      {
        error: err => {
          this.getMessageErrorService.showError(MessageEnum.MESSAGE_01);
          this.id = '';
          console.log(`Error: ${err.url}`, err);
        }
      }
    )
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
