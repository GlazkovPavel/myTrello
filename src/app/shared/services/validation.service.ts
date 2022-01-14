import { Injectable } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable()
export class ValidationService {

  constructor(private http: HttpClient) { }

  public usernameSpecialSymbols(control: FormControl): ValidationErrors | null {
    const valid = /^[a-zA-Z0-9]*$/.test(control.value)
    return valid ? null : { username: 'Используйте только буквы и цифры'}
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
      .pipe(tap((v) => {
       this.usernameValidator(v.data)
    }))
  }


  public usernameValidator(data: string | null): ValidationErrors | null {
    return data ? {
      username: 'Имя пользователя уже существует'
    } : null

  }

}
