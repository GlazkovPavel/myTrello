import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as moment from 'moment'
import {interval, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../modal/modal.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public time$: Observable<string>;
  public data: number = new Date().getFullYear();
  public form: FormGroup;

  constructor(public auth: AuthService,
              private route: Router,
              private readonly modalService: ModalService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.auth.isAuth;

    this.time$ = interval(1000).pipe(
      map(() => {
       return  moment().locale('ru').format('dddd, LL LTS')
      })
    )
   };

  logout() {
    this.auth.logout();
    this.route.navigate(['/'])
  };


  public async openPopup(): Promise<void> {
    const module = await import('../user-info/user-info.component')
    this.modalService.open({
      component: module.UserInfoComponent,
      context: {
        product: {...this}
      }
    })
  }
}
