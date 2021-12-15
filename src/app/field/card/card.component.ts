import {Component, Input, OnInit, Output} from '@angular/core';
import {IListInterface} from "../../interface/list.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Output() sendCardData: IListInterface | undefined;
  @Input() card: IListInterface | undefined
  public value: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onSend(id: any) {
    console.log(id)
  }
}
