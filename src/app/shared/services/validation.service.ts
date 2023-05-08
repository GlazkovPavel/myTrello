import { Injectable } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ValidationService {

  constructor(private http: HttpClient) { }

  public usernameSpecialSymbols(control: UntypedFormControl): ValidationErrors | null {
    const valid = /^[а-яА-ЯёЁa-zA-Z0-9]+$/.test(control.value)
    return valid ? null : { username: 'Используйте только буквы и цифры'}
  }

  public equalValidator({value}: UntypedFormGroup): ValidationErrors | null {
    const [passwordCtrl, cpassword] = Object.values(value);
    return passwordCtrl === cpassword ? null : {
      password: 'Пароли не совпадают'
    }
  }

  public uniqueUsername({value: user}: UntypedFormControl): Observable<ValidationErrors | null> {

    const username = user.toLowerCase()

    return this.http.post('http://localhost:3000/username', {
      username
    }).pipe(map((valid) => {
      return !valid ? null : { usernameErr: 'Данное имя пользователя занято'}
    }))
  }

}
