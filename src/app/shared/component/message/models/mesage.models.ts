import {IMessageInterface} from "../interfaces/message.interface";

export class MessageModel {
  protected code: string = '';
  protected message: string = '';

  public constructor(message?: IMessageInterface) {
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
