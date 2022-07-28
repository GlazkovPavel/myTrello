import {Injectable} from "@angular/core";
import {MessageModel} from "../models/mesage.models";
import {MessageEnum} from "../enum/message.enum";
import {MessageService} from "./message.service";
import {errorMessage} from "../message-const/error-message";
import {dialogMessage} from "../message-const/dialog-message";

@Injectable()
export class GetMessageService {

  constructor(
    private readonly messageService: MessageService) {
  }

  public getMessageError(code: MessageEnum): MessageModel {
    return new MessageModel(errorMessage.get(code))
  }

  public getMessageDialog(code: MessageEnum): MessageModel {
    return new MessageModel(dialogMessage.get(code))
  }

  public showError(code: MessageEnum): void {
    const message: MessageModel = this.getMessageError(code)
    this.messageService.errorMessageModal(message.getMessage())
  }

  public showDialog(code: MessageEnum, method: string, id: string): void {
    const message: MessageModel = this.getMessageDialog(code)
    this.messageService.dialogMessageModal(message.getMessage(), method, id);
  }

}
