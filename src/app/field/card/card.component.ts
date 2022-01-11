import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICardInterface} from "../../interface/card.interface";
import {ModalService} from "../../modal/modal.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Output() handleDeleteCard: EventEmitter<string> = new EventEmitter();
  @Output() handleImportantCard: EventEmitter<string> = new EventEmitter();
  @Output() handleImportantDelete: EventEmitter<string> = new EventEmitter();
  @Input() card: ICardInterface | undefined
  public value: string = '';

  constructor(private readonly modalService: ModalService) {
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

  onCard(card: any) {
    console.log(card)
  }

  public async openPopup(): Promise<void> {
    const module = await import('./card-edit/card-edit.component')
    this.modalService.open({
      component: module.CardEditComponent,
      context: {
        card: {...this.card}
      }
    })
  }
}
