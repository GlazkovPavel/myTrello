import { Injectable } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";

@Injectable()
export class ValidationService {

  constructor() { }

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

}
