import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {IUserLoginInterface} from "../../interface/user-login.interface";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.min(8)
      ])
    })
  }

  submit() {
    const user: IUserLoginInterface = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    }
    this.authService.loginIn(user)
  }
}
