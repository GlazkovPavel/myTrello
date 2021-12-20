import { Component, OnInit } from '@angular/core';
import {Moment} from "moment";
import * as moment from 'moment'
import {interval, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public time$: Observable<string>

  constructor() { }

  ngOnInit(): void {
    this.time$ = interval(1000).pipe(
      map(() => {
       return  moment().locale('ru').format('dddd, LL LTS')
      })
    )
  }

}
