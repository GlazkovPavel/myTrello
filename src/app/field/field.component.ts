import {Component, Injectable, OnInit} from '@angular/core';
import {IListInterface} from "../interface/list.interface";
import {ISpaceInterface} from "../interface/space.interface";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class FieldComponent implements OnInit {

  public spaces: ISpaceInterface[] = [];
  public currentSpace: ISpaceInterface;
  private idSpace: string;

  constructor() { }

  ngOnInit(): void {
    const spaces = JSON.parse(localStorage.getItem('spaces'));
    if(spaces) {
      this.spaces = spaces
      this.currentSpace = this.spaces[0];
    }
    console.log(this.spaces);
    return
  }

  onAddList($event: IListInterface) {
     this.spaces.find(item => item.id === this.idSpace).list.push($event)
    this.spacesAdd()  }

  handleDeleteList($eventId: string | undefined) {
    this.currentSpace.list = this.currentSpace.list.filter(item => item.id !== $eventId);
    this.spacesAdd()  }

  handleSpaceItem($event: ISpaceInterface) {
    this.spaces.push($event)
    this.spacesAdd()  }

  spaceShow(id: string) {
    this.idSpace = '';
    this.currentSpace = this.spaces.find(item => item.id === id);
    this.idSpace = id;
    this.spacesAdd()
  }

  spacesAdd() {
    localStorage.setItem('spaces', JSON.stringify(this.spaces));
  }

}
