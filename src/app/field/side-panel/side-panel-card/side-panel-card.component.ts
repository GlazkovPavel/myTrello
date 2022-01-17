import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-panel-card',
  templateUrl: './side-panel-card.component.html',
  styleUrls: ['./side-panel-card.component.scss']
})
export class SidePanelCardComponent implements OnInit {
  @Output() public handleShowSpace: EventEmitter<string> = new EventEmitter<string>()
  @Input() public spaces: any;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteSpace() {

  }

  showId(id: string) {
    this.handleShowSpace.emit(id);
  }

  oenCard(space: any) {
    console.log(space)
  }
}
