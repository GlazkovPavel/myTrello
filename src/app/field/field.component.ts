import {Component, Injectable, OnInit, Output} from '@angular/core';
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

  public spaces: ISpaceInterface[] = [
    {
      title: "d",
      id: "16419066707",
      list: [
        {
          title: "d",
          id: "16419066759",
          card: [
            {
              title: "d",
              id: "16419066775",
              important: false
            }
          ]
        }
      ]
    }
  ];
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
    this.currentSpace = this.spaces.find(item => item.id === id);
    this.idSpace = id;
  }
}
