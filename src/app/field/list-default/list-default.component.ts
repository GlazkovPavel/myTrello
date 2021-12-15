import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IListInterface} from "../../interface/list.interface";
import {getLocaleDateFormat} from "@angular/common";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-list-default',
  templateUrl: './list-default.component.html',
  styleUrls: ['./list-default.component.scss', '../list/list.component.scss']
})
export class ListDefaultComponent implements OnInit {
  public value: string = '';
  public id: string | undefined;

  @Output() listItem:  EventEmitter<IListInterface> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onIdList(){
    of(String( Math.floor(Date.now() / 1000))).subscribe(
      val => this.id = val
    )
}

  onAddList() {
    this.onIdList();
    debugger;
    this.listItem.emit({
      title: this.value,
      id: this.id
    } )
    this.id = '';
    this.value = '';
  }
}
