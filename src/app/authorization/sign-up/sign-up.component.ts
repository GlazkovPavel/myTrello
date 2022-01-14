import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {IUserInterface} from "../../interface/user.interface";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public nameFormGroup: FormGroup;
  public emailFormGroup: FormGroup;
  public passwordFormGroup: FormGroup;
  public userNameFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private http: HttpClient,
              private route: Router
  ) {
  }

  ngOnInit(): void {
    this.nameFormGroup = this.formBuilder.group({
      nameCtrl: [''],
    }, {
      validators: [Validators.required, Validators.min(2)],
    });
    this.emailFormGroup = this.formBuilder.group({
      emailCtrl: [''],
    }, {
      validators: [Validators.required]
    });
    this.passwordFormGroup = this.formBuilder.group({
      passwordCtrl: [''],
      cpassword: ['']
    }, {
      validators: [Validators.required, Validators.min(8), this.equalValidator]
    });
    this.userNameFormGroup = this.formBuilder.group({
      userNameCtrl: ['', null, this.uniqueUsername.bind(this)]
    }, {
      validators: [Validators.required, Validators.min(2)]
    });
  };

  submit(): void {
    const user: IUserInterface = {
      name: this.nameFormGroup.controls['nameCtrl'].value,
      email: this.emailFormGroup.controls['emailCtrl'].value,
      password: this.passwordFormGroup.controls['passwordCtrl'].value,
      username: this.userNameFormGroup.controls['userNameCtrl'].value
    }
    this.authService.register(user).subscribe(() => {
      //this.route.navigate(['/'])
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
    })
    //   .pipe(tap((v) => {
    //   //this.usernameValidator(v.data)
    // }))
  }


  // public usernameValidator(data: string | null): ValidationErrors | null {
  //   return data ? {
  //     username: 'Имя пользователя уже существует'
  //   } : null
  //
  // }
}
