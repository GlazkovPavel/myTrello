import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {IModalDataInterface} from "../interface/modalData.interface";

@Injectable()
export class ModalService {

  private modalSequence: Subject<IModalDataInterface | null> = new Subject()

  constructor() { }

  public open(componentObj: IModalDataInterface): void {
    this.modalSequence.next(componentObj);
  }

  public get modalSequence$(): Observable<any> {
    return this.modalSequence.asObservable();
  }

  public close(): void {
    this.modalSequence.next(null)
  }
}
