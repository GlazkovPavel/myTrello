import { Component, OnInit } from '@angular/core';
import {IWeekInterface} from "../../interface/week.interface";
import {DateService} from "../../shared/services/date.service";
import * as moment from "moment";

@Component({
  selector: 'app-almanac',
  templateUrl: './almanac.component.html',
  styleUrls: ['./almanac.component.scss', '../calendar.component.scss']
})
export class AlmanacComponent implements OnInit {

  public calendar: IWeekInterface[];

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');

    const calendar = []

    while (date.isBefore(endDay, 'day')){
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            return {
              value, active, disabled, selected
            }
          })
      })
    }
    this.calendar = calendar

  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day);
  }
}
