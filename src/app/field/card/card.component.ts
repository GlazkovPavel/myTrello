import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IListInterface} from "../../interface/list.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Output() handleDeleteCard: EventEmitter<string> = new EventEmitter();
  @Input() card: IListInterface | undefined
  public value: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteCard(id: string | undefined) {
    this.handleDeleteCard.emit(id)

  }
}
