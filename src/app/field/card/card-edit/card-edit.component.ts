import {Component, NgModule, OnInit} from '@angular/core';
import {ICardInterface} from "../../../interface/card.interface";
import {FormsModule} from "@angular/forms";
import {ModalService} from "../../../modal/modal.service";

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['../../../user-info/user-info.component.scss']
})
export class CardEditComponent implements OnInit {

  public card: ICardInterface;

  constructor(private readonly modalService: ModalService) { }

  ngOnInit(): void {
  }

  saveCard(textarea: any) {
    console.log(textarea);
    this.modalService.close();
  }

  isClose() {
    this.modalService.close();
  }
}

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [CardEditComponent]
})
export class CardEditModule {

}
