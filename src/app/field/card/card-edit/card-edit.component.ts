import {Component, NgModule, OnInit} from '@angular/core';
import {ICardInterface} from "../../../interface/card.interface";
import {FormsModule} from "@angular/forms";
import {ModalService} from "../../../modal/modal.service";
import {AppModule} from "../../../app.module";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {ListComponent} from "../../list/list.component";

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss']
})
export class CardEditComponent implements OnInit {

  public card: ICardInterface;
  public placeholder: string;
  public htmlContent: string;

  constructor(private readonly modalService: ModalService,
              private listComponent: ListComponent) { }

  ngOnInit(): void {
    this.htmlContent = this.card.titleCard
  }

  saveCard(card: ICardInterface) {
    const cardEdit =  {
      _id: card._id,
      titleCard: this.htmlContent,
      importantCard: card.importantCard
    }
    //this.listComponent.onEdit(cardEdit)
    this.modalService.close();
  }

  isClose() {
    this.modalService.close();
  }
}

@NgModule({
  imports: [
    FormsModule,
    AppModule,
    AngularEditorModule
  ],
  declarations: [CardEditComponent]
})
export class CardEditModule {

}
