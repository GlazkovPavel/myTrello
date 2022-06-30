import {ErrorPlaces} from "../enum/error-places.enum";
import {ErrorMethods} from "../enum/error-methods.enum";
import {IError} from "../interfaces/error.interface";

export class ErrorModel {
  public readonly code: any;
  public readonly message: string;

  private place: ErrorPlaces;
  private method: ErrorMethods;
  private err: any;

  constructor(data: IError) {
    const error: any = data.err;
    this.err = error || null;
    this.place = data.place || null;
    this.method = data.method || null;
    this.code = error?.code || data?.code;
    this.message = error?.description || data?.description;
  }

  public getMethod(): ErrorMethods {
    return this.method;
  }

  public getPlace(): ErrorPlaces {
    return this.place;
  }

  public setMethod(method: ErrorMethods): ErrorModel {
    this.method = method;
    return this;
  }

  public setPlace(place: ErrorPlaces): ErrorModel {
    this.place = place;
    return this;
  }

  public getMessage(): string {
    return this.message && this.message.replace(/\.{1}$/, '');
  }
}
