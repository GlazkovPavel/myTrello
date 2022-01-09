import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import {interval, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public time$: Observable<string>

  constructor(public auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    debugger
    this.isLoggedIn = this.auth.isAuth;


    this.time$ = interval(1000).pipe(
      map(() => {
       return  moment().locale('ru').format('dddd, LL LTS')
      })
    )
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.route.navigate(['/sign-in'])
  }
}
