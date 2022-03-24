import {Injectable} from "@angular/core";
import {MessageModel} from "../models/mesage.models";
import {IMessageInterface} from "../interfaces/message.interface";
import {MessageEnum} from "../enum/message.enum";
import {MessageService} from "./message.service";

@Injectable()
export class GetMessageService {

  constructor(private readonly messageService: MessageService,) {
  }

  public getMessage(code: MessageEnum): MessageModel {
    return new MessageModel(this.dialog.get(code))
  }

  public showError(code: MessageEnum): void {
    const message: MessageModel = this.getMessage(code)
    this.messageService.errorMessageModal(message.getMessage())
  }

  public showDialog(code: MessageEnum, method: string, id: string): void {
    const message: MessageModel = this.getMessage(code)
    this.messageService.dialogMessageModal(message.getMessage(), method, id);
  }

  protected dialog: Map<MessageEnum, IMessageInterface> = new Map( [
    //Ошибки начинаются с 00
    [
      MessageEnum.MESSAGE_01,
      {
        code: 'MESSAGE_01',
        message: 'Произошла непредвиденная ошибка'
      }
    ],
    [
      MessageEnum.MESSAGE_02,
      {
        code: 'MESSAGE_02',
        message: 'Нельзя удалять пользователей если вы не владелец данного рабочего пространства'
      }
    ],
    [
      MessageEnum.MESSAGE_03,
      {
        code: 'MESSAGE_03',
        message: 'Нет прав, нельзя удалять ресурсы других пользователей'
      }
    ],
    // Диалоговые сообщения, начинаются с 10
    [
      MessageEnum.MESSAGE_10,
      {
        code: 'MESSAGE_10',
        message: 'Вы действительно хотите выйти из данного рабочего пространства?'
      }
    ],
  ])
}
