import {Component, NgModule, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalService} from "../modal/modal.service";
import {AppModule} from "../app.module";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {CommonModule} from "@angular/common";
import {UserCheckService} from "./user.service";
import {ValidationService} from "../shared/services/validation.service";
import {IUserInfoInterface} from "../interface/user-info.interface";
import {DirectiveModule} from "../shared/directives/directive.module";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public form: UntypedFormGroup;
  public isFormDisabled: boolean = true;
  public userName: string = '';

  constructor(private readonly modalService: ModalService,
              private readonly userService: UserCheckService,
              private readonly validationService: ValidationService) {
  }

  ngOnInit(): void {

    const userInfo: IUserInfoInterface = JSON.parse(localStorage.getItem('userInfo'))

    this.userName = userInfo.name;

    this.form = new UntypedFormGroup({
      email: new UntypedFormControl({value: userInfo.email, disabled: true},[
        Validators.email,
        Validators.required
      ]),
      avatar: new UntypedFormControl({value: userInfo?.avatar, disabled: true},[
        Validators.pattern(/^((http|https):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i),
      ]),
      name: new UntypedFormControl({value: userInfo.name, disabled: true},[
        Validators.required,
        Validators.min(2),
        this.validationService.usernameSpecialSymbols
      ]),
      surname: new UntypedFormControl({value: userInfo.surname, disabled: true},[
        Validators.required,
        Validators.min(2),
        this.validationService.usernameSpecialSymbols
      ]),
      username: new UntypedFormControl({value: userInfo.username, disabled: true},[
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
      name: this.form.controls['name'].value.toLowerCase(),
      surname: this.form.controls['surname'].value.toLowerCase(),
      username: this.form.controls['username'].value.toLowerCase(),
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
        CommonModule,
        DirectiveModule
    ],
  providers: [
    UserCheckService
  ]
})
export class UserInfoModule {
}
