import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {IUserInterface} from "../../interface/user.interface";
import {AuthService} from "../../shared/services/auth.service";
import {HttpClient} from "@angular/common/http";

import {ValidationService} from "../../shared/services/validation.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public form: UntypedFormGroup;
  public errorMessage: string = '';


  constructor(private formBuilder: UntypedFormBuilder,
              private authService: AuthService,
              private http: HttpClient,
              private validationService: ValidationService
  ) {}

  ngOnInit(): void {

    this.form = new UntypedFormGroup({
      nameCtrl: new UntypedFormControl(null, [
        Validators.required,
        this.validationService.usernameSpecialSymbols
      ]),
      surnameCtrl: new UntypedFormControl(null, [
        Validators.required,
        this.validationService.usernameSpecialSymbols
      ]),
      emailCtrl: new UntypedFormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new UntypedFormGroup({
        passwordCtrl: new UntypedFormControl(null, [
          Validators.required,
          Validators.min(8)
        ]),
        cpassword: new UntypedFormControl(null, [
          Validators.required,
          Validators.min(8),
        ])
        // @ts-ignore

      }, [this.validationService.equalValidator]),

      userNameCtrl: new UntypedFormControl('' || null, [
        Validators.required,
        Validators.min(2),
        this.validationService.usernameSpecialSymbols
        // @ts-ignore
      ], [this.validationService.uniqueUsername.bind(this)])
    })
  }

  submit(): void {
    const user: IUserInterface = {
      name: this.form.controls['nameCtrl'].value.toLowerCase(),
      surname: this.form.controls['surnameCtrl'].value.toLowerCase(),
      email: this.form.controls['emailCtrl'].value,
      password: this.form.controls['password'].value['passwordCtrl'],
      username: this.form.controls['userNameCtrl'].value.toLowerCase()
    }
    console.log('user-->', user)
    this.authService.register(user).subscribe(() => {
      //this.route.navigate(['/'])
      console.log('this.authService.register(user).subscribe')
    })
  }

}
