import {IErrorInterface} from "../interfaces/error.interface";

export class ErrorMessage {
  protected code: string = '';
  protected message: string = '';

  public constructor(message?: IErrorInterface) {
    this.code = message.code || '';
    this.message = message.message || '';
  }

  public getCode(): string {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

}
