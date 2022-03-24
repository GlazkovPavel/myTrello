import {Component, NgModule, OnInit} from '@angular/core';
import {IMessageInterface} from "../../interfaces/message.interface";
import {ModalService} from "../../../../../modal/modal.service";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {map} from "rxjs/operators";
import {FieldComponent} from "../../../../../field/field.component";
import {WorkSpaceService} from "../../../../services/work-space.service";

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
              private readonly workSpaceService: WorkSpaceService) { }

  isClose() {
    this.modalService.close();
  }

  isConfirm() {

    if(this.method === 'handleDeleteSpaceId') {
      this.modalService.confirmSend(true);
      this.modalService.close();
      const a = this.modalService.confirmSequence$.pipe(
        map((v:boolean) => {
         if(v.valueOf()) {
           this.workSpaceService.deleteWorkSpace(this.id).subscribe(
             value => {
               this.fieldService.deleteSpaceId(this.id)
               console.log(value)
             }
             )
         } })
      ).subscribe()
      console.log(a)
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
