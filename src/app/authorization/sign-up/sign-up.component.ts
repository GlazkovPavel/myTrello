import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IUserInterface} from "../../interface/user.interface";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

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
              private route: Router
  ) { }

  ngOnInit(): void {
    this.nameFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
    });
    this.emailFormGroup = this.formBuilder.group({
      emailCtrl: ['',  Validators.email],
    });
    this.passwordFormGroup = this.formBuilder.group({
      passwordCtrl: ['', Validators.min(8)]
    });
    this.userNameFormGroup = this.formBuilder.group( {
      userNameCtrl: ['', Validators.required]
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
}
