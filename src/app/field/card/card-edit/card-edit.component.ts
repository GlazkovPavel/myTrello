import {Component, NgModule, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss']
})
export class CardEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //логика

}

@NgModule({
  declarations: [CardEditComponent]
})
export class CardEditModule {

}
