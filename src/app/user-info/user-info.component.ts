import {Component, NgModule, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IUpdateUserInfoInterface} from "../interface/updateUserInfo.interface";
import {ModalService} from "../modal/modal.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public form: FormGroup;


  constructor(private readonly modalService: ModalService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.email
      ]),
      name: new FormControl(null,[
        Validators.required
      ]),
      username: new FormControl(null,[
        Validators.required
      ])
    })
  };

  submit() {
    const updateUserInfo: IUpdateUserInfoInterface = {
      email: this.form.controls['email'].value,
      name: this.form.controls['name'].value,
      username: this.form.controls['username'].value
    }
    console.log(updateUserInfo);
    this.modalService.close();
  }

}

@NgModule({
  declarations: [UserInfoComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserInfoModule {
}
