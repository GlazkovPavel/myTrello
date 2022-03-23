import {Injectable} from "@angular/core";
import {ErrorMessage} from "../models/error-mesage.models";
import {IErrorInterface} from "../interfaces/error.interface";
import {ErrorMessageEnum} from "../error-messages/enum/error-message.enum";
import {ErrorService} from "./error.service";

@Injectable()
export class GetMessageErrorService {

  constructor(private readonly errorService: ErrorService,) {
  }

  public getMessage(code: ErrorMessageEnum): ErrorMessage {
    return new ErrorMessage(this.dialog.get(code))
  }

  public showError(code: ErrorMessageEnum): void {
    const errMessage: ErrorMessage = this.getMessage(code)
    this.errorService.errorModal(errMessage.getMessage())
  }

  protected dialog: Map<ErrorMessageEnum, IErrorInterface> = new Map( [
    [
      ErrorMessageEnum.MESSAGE_01,
      {
        code: 'MESSAGE_01',
        message: 'Произошла непредвиденная ошибка'
      }
    ],
    [
      ErrorMessageEnum.MESSAGE_02,
      {
        code: 'MESSAGE_02',
        message: 'Нельзя удалять пользователей если вы не владелец данного рабочего пространства'
      }
    ],
    [
      ErrorMessageEnum.MESSAGE_03,
      {
        code: 'MESSAGE_03',
        message: 'Нет прав, нельзя удалять ресурсы других пользователей'
      }
    ],
  ])
}
