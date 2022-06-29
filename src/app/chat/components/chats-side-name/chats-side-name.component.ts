import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chats-side-name',
  templateUrl: './chats-side-name.component.html',
  styleUrls: ['./chats-side-name.component.scss']
})
export class ChatsSideNameComponent implements OnInit {


  constructor() { }

  readonly testForm = new FormGroup({
    testValue: new FormControl(),
  });
  value = '';

  ngOnInit(): void {
  }

  onClick($event: MouseEvent) {

  }
}
