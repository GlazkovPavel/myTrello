import {Component, OnInit, Output} from '@angular/core';
import {IListInterface} from "../interface/list.interface";
import {ISpaceInterface} from "../interface/space.interface";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  //public lists: IListInterface[] = [];
  public spaces: ISpaceInterface[] = [];
  public currentSpace: ISpaceInterface;
  private idSpace: string;

  constructor() { }

  ngOnInit(): void {}

  onAddList($event: IListInterface) {
     this.spaces.find(item => item.id === this.idSpace).list.push($event)
  }

  handleDeleteList($eventId: string | undefined) {
    this.currentSpace.list = this.currentSpace.list.filter(item => item.id !== $eventId);
  }

  handleSpaceItem($event: ISpaceInterface) {
    this.spaces.push($event)
    console.log($event)
  }

  spaceShow(id: string) {
    this.idSpace = '';
    debugger;
    this.currentSpace = this.spaces.find(item => item.id === id);
    this.idSpace = id;
  }
}
