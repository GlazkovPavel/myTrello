import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISpaceCardInterface} from "../../../interface/space-card.interface";

@Component({
  selector: 'app-side-panel-card',
  templateUrl: './side-panel-card.component.html',
  styleUrls: ['./side-panel-card.component.scss']
})
export class SidePanelCardComponent implements OnInit {
  @Output() public handelShowSpase: EventEmitter<string> = new EventEmitter<string>()
  @Input() public spaces: any;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteSpase() {

  }

  showId(id: string) {
    this.handelShowSpase.emit(id);
    console.log(id)
  }
}
