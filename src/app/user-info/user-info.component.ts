import {Component, NgModule, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalService} from "../modal/modal.service";
import {AppModule} from "../app.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {UserCheckService} from "./user.service";
import {ValidationService} from "../shared/services/validation.service";
import {IUserInfoInterface} from "../interface/user-info.interface";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public form: FormGroup;
  public isFormDisabled: boolean = true;

  constructor(private readonly modalService: ModalService,
              private readonly userService: UserCheckService,
              private readonly validationService: ValidationService) {
  }

  ngOnInit(): void {

    const userInfo: IUserInfoInterface = JSON.parse(localStorage.getItem('userInfo'))

    this.form = new FormGroup({
      email: new FormControl({value: userInfo.email, disabled: true},[
        Validators.email,
        Validators.required
      ]),
      avatar: new FormControl({value: userInfo?.avatar, disabled: true},[
        Validators.required,
        Validators.pattern(/^((http|https):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i),
      ]),
      name: new FormControl({value: userInfo.name, disabled: true},[
        Validators.required,
        Validators.min(2),
        this.validationService.usernameSpecialSymbols
      ]),
      username: new FormControl({value: userInfo?.username, disabled: true},[
        Validators.required,
        Validators.min(2),
        this.validationService.usernameSpecialSymbols
        // @ts-ignore
      ], [this.validationService.uniqueUsername.bind(this.userService) ])
    })
  };

  submit() {
    const updateUserInfo: IUserInfoInterface = {
      email: this.form.controls['email'].value,
      name: this.form.controls['name'].value,
      username: this.form.controls['username'].value,
      avatar: this.form.controls['avatar'].value
    }
    this.userService.updateUserInfo(updateUserInfo).subscribe()
    this.modalService.close();
  }

  onEdit() {
    this.isFormDisabled = false;
    this.form.enable();
  }

  isClose() {
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
    UserCheckService
  ]
})
export class UserInfoModule {
}
