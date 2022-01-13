import {Component, NgModule, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IUpdateUserInfoInterface} from "../interface/updateUserInfo.interface";
import {ModalService} from "../modal/modal.service";
import {AppModule} from "../app.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {UserService} from "./user.service";
import {IUserInterface} from "../interface/user.interface";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {


  public form: FormGroup;
  public userInfo:  IUserInterface

  constructor(private readonly modalService: ModalService,
              private readonly userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUserInfo().pipe(
     map((v) => this.userInfo = v)
   ).subscribe()



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

  submit() {
    const updateUserInfo: IUpdateUserInfoInterface = {
      email: this.form.controls['email'].value,
      name: this.form.controls['name'].value,
      username: this.form.controls['username'].value
    }
    console.log(updateUserInfo);
    this.modalService.close();
  }

}

@NgModule({
  declarations: [UserInfoComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppModule,
    MatFormFieldModule,
    CommonModule
  ],
  providers: [
    UserService
  ]
})
export class UserInfoModule {
}
