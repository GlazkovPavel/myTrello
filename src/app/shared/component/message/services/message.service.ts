import {Injectable, Input} from '@angular/core';
import {ModalService} from "../../../../modal/modal.service";
import {IMessageInterface} from "../interfaces/message.interface";

@Injectable()
export class MessageService {

  @Input() error: IMessageInterface;

  constructor(private readonly modalService: ModalService) { }

  public async errorMessageModal(message: string): Promise<void> {
    const module = await import('../error-handing/component/error-handing.component')
    this.modalService.open({
      component: module.ErrorHandingComponent,
      context: {
        message: message
      }
    })
  };

  public async dialogMessageModal(message: string, method: string, id: string): Promise<void>  {
    const module = await import('../dialog-haiding/dialog/dialog.component')
    this.modalService.open({
      component: module.DialogComponent,
      context: {
        message: message,
        method: method,
        id: id
      }
    })
  }

}
