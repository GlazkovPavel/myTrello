import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICardInterface} from "../../interface/card.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],

})
export class CardComponent {

  @Output() handleDeleteCard: EventEmitter<string> = new EventEmitter();
  @Output() handleImportantCard: EventEmitter<string> = new EventEmitter();
  @Output() handleImportantDelete: EventEmitter<string> = new EventEmitter();
  @Output() showEditCard: EventEmitter<boolean> = new EventEmitter();
  @Output() editCardData: EventEmitter<ICardInterface> = new EventEmitter();

  @Input() card: ICardInterface | undefined
  public value: string = '';

  constructor() {
  }

  onDeleteCard(id: string | undefined) {
    this.handleDeleteCard.emit(id);
  }

  onImportantCard(id: string | undefined) {
    this.handleImportantCard.emit(id);
  }

  onImportantDelete(id: string | undefined) {
    this.handleImportantDelete.emit(id);
  }


  public  openPopup(card: ICardInterface) {
    this.showEditCard.emit(true);
    this.editCardData.emit(card);

  }


}
