import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {IUserInterface} from "../../interface/user.interface";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {delay, tap} from "rxjs/operators";
import {ValidationService} from "../../shared/services/validation.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup;
  public errorMessage: string = '';


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private http: HttpClient,
              private validationService: ValidationService
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      nameCtrl: new FormControl(null, [
        Validators.required,
        this.validationService.usernameSpecialSymbols
      ]),
      emailCtrl: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormGroup({
        passwordCtrl: new FormControl(null, [
          Validators.required,
          Validators.min(8)
        ]),
        cpassword: new FormControl(null, [
          Validators.required,
          Validators.min(8),
        ])
        // @ts-ignore

      }, [this.equalValidator]),

      userNameCtrl: new FormControl('' || null, [
        Validators.required,
        Validators.min(2),
        this.validationService.usernameSpecialSymbols
        // @ts-ignore
      ], [this.uniqueUsername.bind(this)])
    })
  }

  submit(): void {
    const user: IUserInterface = {
      name: this.form.controls['nameCtrl'].value,
      email: this.form.controls['emailCtrl'].value,
      password: this.form.controls['password'].value['passwordCtrl'],
      username: this.form.controls['userNameCtrl'].value
    }
    console.log('user-->', user)
    this.authService.register(user).subscribe(() => {
      //this.route.navigate(['/'])
      console.log('this.authService.register(user).subscribe')
    })
  }

  public equalValidator({value}: FormGroup): ValidationErrors | null {
    const [passwordCtrl, cpassword] = Object.values(value);
    return passwordCtrl === cpassword ? null : {
      password: 'Пароли не совпадают'
    }
  }

  public uniqueUsername({value: username}: FormControl): Observable<ValidationErrors | null> {
    return this.http.post('http://localhost:3000/username', {
      username
    }).pipe(
      tap((v) => {
      if(v?.message){
        return this.errorMessage = v?.message;
      }
      return this.errorMessage = '';

    } ))
  }

}
