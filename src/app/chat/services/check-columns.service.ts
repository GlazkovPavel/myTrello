import {Injectable} from '@angular/core';
import {FormControl, ValidationErrors} from "@angular/forms";

@Injectable()
export class CheckColumnsService {

  constructor() { }

  public checkColumns(control: FormControl): ValidationErrors | null {
    debugger
    return control.value
  }
}
