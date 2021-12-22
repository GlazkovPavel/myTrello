import {Component, OnDestroy, OnInit} from '@angular/core';
import {DayService} from "../shared/services/day.service";
import {IJournalInterface} from "../interface/journal.interface";
import {IdGeneratorService} from "../shared/services/id-generator.service";
import {Subscription} from "rxjs";
import {DateService} from "../shared/services/date.service";
import {JournalService} from "../shared/services/journal.service";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss',
    '../calendar/selector/selector.component.scss',
    '../calendar/calendar.component.scss'
  ]
})

export class JournalComponent implements OnInit {


  public htmlContent: string;
  private idItem: string;

  constructor(public dayService: DayService,
              private idGeneratorService: IdGeneratorService,
              private dateService: DayService,
              private journalService: JournalService) {
  };

  ngOnInit(): void {
    this.dayService.date.pipe(
      switchMap(value => this.journalService.load(value))
    ).pipe(map((v) => v.map((i) => {
      this.htmlContent = i.text
      this.idItem = i.date

    }))).subscribe()
  };

  go(dir: number) {
    this.htmlContent = '';
    this.idItem = '';
    this.dayService.changeDay(dir)
  }

  submit() {

    if(this.idItem) {
      console.log('Update')
    } else if (this.htmlContent){
      const value: IJournalInterface = {
        text: this.htmlContent,
        date: this.dateService.date.value.format('DD-MM-YYYY')
      };
      this.journalService.create(value).subscribe(
        item => {
          this.htmlContent = item.text
          this.idItem = item.date
        }
      );
      console.log(value);
    }
    return;
  }

  // ngOnDestroy(): void {
  //   if (this.subId){
  //     this.subId.unsubscribe()
  //   }
  // }

}
