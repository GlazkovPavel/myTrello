import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private route: Router, private auth: AuthService,) { }

  ngOnInit(): void {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.auth.isAuth = true;
      this.route.navigate(['/home']);
    }
    return;
  }

}
