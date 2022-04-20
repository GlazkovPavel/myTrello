 import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISpaceInterface} from "../../../interface/space.interface";
 import {Observable} from "rxjs";

@Component({
  selector: 'app-side-panel-card',
  templateUrl: './side-panel-card.component.html',
  styleUrls: ['./side-panel-card.component.scss']
})
export class SidePanelCardComponent  {

  @Output() public handleShowSpace: EventEmitter<ISpaceInterface> = new EventEmitter<ISpaceInterface>()
  @Output() public handleSpace: EventEmitter<string> = new EventEmitter<string>()
  @Input() public spaces: Observable<ISpaceInterface[]>


  showSpace($event: ISpaceInterface) {
    this.handleShowSpace.emit($event)

  }

  handleSpaceId($event: string) {
    this.handleSpace.emit($event)
  }
}
