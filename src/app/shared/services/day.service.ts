import {Injectable} from '@angular/core';
import * as moment from 'moment'
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment().locale('ru'))

  changeDay(dir: number) {
    const value = this.date.value.add(dir, 'day')
    this.date.next(value)
  }
}
