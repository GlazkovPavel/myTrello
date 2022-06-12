import {Component, OnInit} from '@angular/core';
import {DayService} from "../shared/services/day.service";
import {IJournalInterface} from "../interface/journal.interface";
import {JournalService} from "../shared/services/journal.service";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss',
    '../calendar/selector/selector.component.scss',
    '../calendar/calendar.component.scss']
})

export class JournalComponent implements OnInit {

  public htmlContent: string;
  public placeholder: string;
  private idItem: string;

  constructor(public dayService: DayService,
              private dateService: DayService,
              private journalService: JournalService) {
  };

  ngOnInit(): void {
    this.dayService.date.pipe(
      switchMap(value => this.journalService.load(value))
    ).pipe(map(
      (i) => {
        if (i) {
          this.htmlContent = i.text
          this.idItem = i.date
        }
        this.placeholder = `Записей на ${this.dayService.date.value.format('L')} нет. Пора начать ;)`
    })
    ).subscribe()
  };

  go(dir: number) {
    this.htmlContent = '';
    this.idItem = '';
    this.dayService.changeDay(dir)
  }

  submit() {
    const value: IJournalInterface = {
      text: this.htmlContent,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    if (this.htmlContent){

      this.journalService.create(value).subscribe(
        item => {
          this.htmlContent = item.text
          this.idItem = item.date
        });
    }
    return;
  }

}
