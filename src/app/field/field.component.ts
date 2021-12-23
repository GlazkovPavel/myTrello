import {Component, OnInit, Output} from '@angular/core';
import {IListInterface} from "../interface/list.interface";
import {ISpaceInterface} from "../interface/space.interface";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  public lists: IListInterface[] = [];
  @Output() spaces: ISpaceInterface[] = [];

  constructor() { }

  ngOnInit(): void {}

  onAddList($event: IListInterface) {
    this.lists.push($event)
  }

  handleDeleteList($eventId: string | undefined) {
    this.lists = this.lists.filter(item => item.id !== $eventId);
  }

  handelSpaceItem($event: ISpaceInterface) {
    this.spaces.push($event)
    console.log($event)
  }
}
