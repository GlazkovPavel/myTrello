import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as moment from 'moment'
import {interval, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {ModalService} from "../modal/modal.service";
import {IUserInfoInterface} from "../interface/user-info.interface";

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
  public userInfo: IUserInfoInterface = JSON.parse(localStorage.getItem('userInfo'))
  public firstLetter$ : Observable<string>;
  public isUrlOAuthYandex: string = 'https://oauth.yandex.ru/authorize?response_type=code&client_id=31026068d92a40e791f27a255ea85f18&redirect_uri=http%3A%2F%2Flocalhost%3A4200';


  constructor(public auth: AuthService,
              private route: Router,
              private readonly modalService: ModalService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.auth.isAuth;

    this.time$ = interval(1000).pipe(
      map(() => {
       return  moment().locale('ru').format('dddd, LL LTS')
      })
    );
    this.firstLetter$ = this.initial().pipe(map((v) => v.firstLetter))

   };

  initial() {
    return of({
      name: this.userInfo?.name,
      username: this.userInfo?.surname,
      get firstLetter() {
        return `${this.name[0]} ${this.username[0]}`
      }
    })
  }

  public logout() {
    this.auth.logout();
    this.route.navigate(['/'])
  };

  public loginOAuthYandex(): void {
    //this.route.navigate(this.isUrlOAuthYandex)
  }

  public async openPopup(): Promise<void> {
    const module = await import('../user-info/user-info.component')
    this.modalService.open({
      component: module.UserInfoComponent,
      context: {
        user: {...this}
      }
    })
  }
}
