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
  public spacesHot: ISpaceInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    this.spaces = JSON.parse(localStorage.getItem('spaces'));
    console.log(this.spaces)
  }

  onAddList($event: IListInterface) {
     this.spaces.find(item => item.id === this.idSpace).list.push($event)
    localStorage.setItem('spaces', JSON.stringify(this.spaces));
  }

  handleDeleteList($eventId: string | undefined) {
    this.currentSpace.list = this.currentSpace.list.filter(item => item.id !== $eventId);
    localStorage.setItem('spaces', JSON.stringify(this.spaces));
  }

  handleSpaceItem($event: ISpaceInterface) {
    this.spaces.push($event)
    localStorage.setItem('spaces', JSON.stringify(this.spaces));
  }

  spaceShow(id: string) {
    this.idSpace = '';
    this.currentSpace = this.spaces.find(item => item.id === id);
    this.idSpace = id;
    localStorage.setItem('spaces', JSON.stringify(this.spaces));
  }

  spacesAdd() {
    localStorage.setItem('spaces', JSON.stringify(this.spaces));
  }

}
