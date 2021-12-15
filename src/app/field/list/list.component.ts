import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICardInterface} from "../../interface/card.interface";
import {IListInterface} from "../../interface/list.interface";
import {of} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: IListInterface | undefined;
  public value: string | undefined;
  public addCard: boolean = false;
  public id: string | undefined;

  constructor() { }

  public toDo: IListInterface[] = []

  ngOnInit(): void {
  }

  onIdList(){
    of(String( Math.floor(Date.now() / 1000))).subscribe(
      val => this.id = val
    )
  }

  onAddCard() {
    this.onIdList();
    debugger;
    this.toDo.push(<IListInterface>{
      title: this.value,
      id: this.id
    } )
    this.id = '';
    this.value = '';
  }
}
