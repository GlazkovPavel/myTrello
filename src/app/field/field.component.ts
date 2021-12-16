import { Component, OnInit } from '@angular/core';
import {ICardInterface} from "../interface/card.interface";
import {IListInterface} from "../interface/list.interface";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  public lists: IListInterface[] = [];
  public valueList: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddList($event: IListInterface) {
    this.lists.push($event)
  }


}
