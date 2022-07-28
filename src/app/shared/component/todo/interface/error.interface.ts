import {ErrorModel} from "../../../error/models/error.model";
import {ErrorMethods} from "../../../error/enum/error-methods.enum";
import {MessageEnum} from "../../message/enum/message.enum";

export interface IErrorInterface {
  error: ErrorModel,
  errorMethod: ErrorMethods,
  errorMessage: MessageEnum

}
