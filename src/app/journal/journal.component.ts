import { Component, OnInit } from '@angular/core';
import {DayService} from "../shared/services/day.service";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss',
    '../calendar/selector/selector.component.scss']
})
export class JournalComponent implements OnInit {

  constructor(public dayService: DayService) { }

  ngOnInit(): void {
  }

  go(dir: number) {
    this.dayService.changeDay(dir)
  }

}
