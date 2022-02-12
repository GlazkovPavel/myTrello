 import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISpaceInterface} from "../../../interface/space.interface";

@Component({
  selector: 'app-side-panel-card',
  templateUrl: './side-panel-card.component.html',
  styleUrls: ['./side-panel-card.component.scss']
})
export class SidePanelCardComponent implements OnInit {

  @Output() public handleShowSpace: EventEmitter<string> = new EventEmitter<string>()
  @Output() public handleSpace: EventEmitter<string> = new EventEmitter<string>()
  @Input() public spaces: ISpaceInterface[];

  constructor() { }

  ngOnInit(): void {}


  showSpace($event: string) {
    this.handleShowSpace.emit($event)

  }

  handleSpaceId($event: string) {
    this.handleSpace.emit($event)
  }
}
