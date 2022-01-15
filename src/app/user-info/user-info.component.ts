import {Component, NgModule, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {IUpdateUserInfoInterface} from "../interface/updateUserInfo.interface";
import {ModalService} from "../modal/modal.service";
import {AppModule} from "../app.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {UserService} from "./user.service";
import {IUserInterface} from "../interface/user.interface";
import {map, pluck} from "rxjs/operators";
import {ValidationService} from "../shared/services/validation.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {IUserInfoInterface} from "../interface/user-info.interface";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public form: FormGroup;
  //public userInfo:  Observable<IUserInterface> = this.activatedRoute.root.data.pipe(pluck('userInfo'))
  public isFormDisabled: boolean = true;

  constructor(private readonly modalService: ModalService,
              private readonly userService: UserService,
              private readonly validationService: ValidationService,
              private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    //console.log(this.userInfo.subscribe())

   //  this.userService.getUserInfo().pipe(
   //   map((v) => this.userInfo = v)
   // ).subscribe()

    const userInfo: IUserInfoInterface = JSON.parse(localStorage.getItem('userInfo'))

    this.form = new FormGroup({
      email: new FormControl({value: userInfo.email, disabled: true},[
        Validators.email,
        Validators.required
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
      ], [this.userService.uniqueUsername.bind(this.userService) ])
    })
  };

  // public equalValidator({value}: FormGroup): ValidationErrors | null {
  //   debugger
  //   const [email, name, username] = Object.values(value);
  //   return email === this.form?.controls['email'].value ? null : null
  // }

  submit() {
    const updateUserInfo: IUpdateUserInfoInterface = {
      email: this.form.controls['email'].value,
      name: this.form.controls['name'].value,
      username: this.form.controls['username'].value
    }
    console.log(updateUserInfo);
    this.modalService.close();
  }

  onEdit() {
    this.isFormDisabled = false;
    this.form.enable();
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
