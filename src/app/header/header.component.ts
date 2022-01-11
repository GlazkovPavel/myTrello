import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as moment from 'moment'
import {interval, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUpdateUserInfoInterface} from "../interface/updateUserInfo.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public time$: Observable<string>;
  public popupOpen: boolean = false;
  public form: FormGroup;

  constructor(public auth: AuthService,
              private route: Router) { }

  ngOnInit(): void {

    this.isLoggedIn = this.auth.isAuth;

    this.time$ = interval(1000).pipe(
      map(() => {
       return  moment().locale('ru').format('dddd, LL LTS')
      })
    )

    this.form = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.email
      ]),
      name: new FormControl(null,[
      Validators.required
      ]),
      username: new FormControl(null,[
        Validators.required
      ])
    })
  };

  logout() {
    this.auth.logout();
    this.route.navigate(['/'])
  };

  setNav() {
    this.popupOpen = !this.popupOpen;
  }

  submit() {
    this.popupOpen = !this.popupOpen;
    const updateUserInfo: IUpdateUserInfoInterface = {
      email: this.form.controls['email'].value,
      name: this.form.controls['name'].value,
      username: this.form.controls['username'].value
    }
    console.log(updateUserInfo);
  }
}
