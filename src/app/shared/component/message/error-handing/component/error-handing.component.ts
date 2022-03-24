import {Component, NgModule, OnInit} from '@angular/core';
import {ModalService} from "../../../../../modal/modal.service";
import {IMessageInterface} from "../../interfaces/message.interface";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-error-handing',
  templateUrl: './error-handing.component.html',
  styleUrls: ['./error-handing.component.scss']
})
export class ErrorHandingComponent implements OnInit {

  public message: IMessageInterface;

  constructor(private readonly modalService: ModalService) { }

  ngOnInit(): void {
  }

  isClose() {
    this.modalService.close();
  }
}

@NgModule({
  declarations: [ErrorHandingComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
})
export class ErrorHandingModule {
}
