import {Injectable, Input} from '@angular/core';
import {ErrorHandingComponent} from "../component/error-handing.component";
import {ModalService} from "../../../../modal/modal.service";
import {IErrorInterface} from "../interfaces/error.interface";

@Injectable()
export class ErrorService {

  @Input() error: IErrorInterface;

  constructor(private readonly modalService: ModalService) { }

  public errorModal(err: string) {
    this.modalService.open({
      component: ErrorHandingComponent,
      context: {
        error: err
      }
    })
  }
}
