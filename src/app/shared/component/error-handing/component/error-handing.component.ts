import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../../../modal/modal.service";
import {IErrorInterface} from "../interfaces/error.interface";

@Component({
  selector: 'app-error-handing',
  templateUrl: './error-handing.component.html',
  styleUrls: ['./error-handing.component.scss']
})
export class ErrorHandingComponent implements OnInit {

  public error: IErrorInterface;

  constructor(private readonly modalService: ModalService) { }

  ngOnInit(): void {
  }

  isClose() {
    this.modalService.close();
  }
}
