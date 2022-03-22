import { Injectable } from '@angular/core';
import {ErrorHandingComponent} from "./component/error-handing.component";
import {ModalService} from "../../../modal/modal.service";

@Injectable()
export class ErrorService {

  constructor(private readonly modalService: ModalService) { }

  public errorModal(err: string) {
    this.modalService.open({
      component: ErrorHandingComponent,
      context: {
        error: {...this}
      }
    })
  }
}
