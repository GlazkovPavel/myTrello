import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IModalDataInterface} from "../interface/modalData.interface";

@Injectable()
export class ModalService {

  private modalSequence: Subject<IModalDataInterface | null> = new Subject();
  private confirm: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(false);

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

  public confirmSend(event$: boolean) {
    this.confirm.next(event$)
  }

  public get confirmSequence$(): Observable<any> {
    return this.confirm.asObservable();
  }
}
