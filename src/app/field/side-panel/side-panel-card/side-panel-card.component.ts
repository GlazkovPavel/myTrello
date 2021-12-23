import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-panel-card',
  templateUrl: './side-panel-card.component.html',
  styleUrls: ['./side-panel-card.component.scss']
})
export class SidePanelCardComponent implements OnInit {

  @Input() public spaces: any;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteSpase() {

  }
}
