import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IListInterface} from "../../interface/list.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  //@Output() sendCardData: EventEmitter<IListInterface> = new EventEmitter();
  @Input() card: IListInterface | undefined
  public value: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  // onSend(id: string) {
  //   this.sendCardData.emit({
  //     title: this.value,
  //     id: id
  //   });
  //   this.value = '';
  // }
}
