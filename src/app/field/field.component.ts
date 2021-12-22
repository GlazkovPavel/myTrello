import { Component, OnInit } from '@angular/core';
import {IListInterface} from "../interface/list.interface";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  public lists: IListInterface[] = [];

  constructor() { }

  ngOnInit(): void {}

  onAddList($event: IListInterface) {
    this.lists.push($event)
  }

  handleDeleteList($eventId: string | undefined) {
    this.lists = this.lists.filter(item => item.id !== $eventId);
  }
}
