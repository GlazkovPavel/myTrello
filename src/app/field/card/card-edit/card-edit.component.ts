import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ICardInterface} from "../../../interface/card.interface";
import {ListComponent} from "../../list/list.component";

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss']
})
export class CardEditComponent implements OnInit {

  @Output() public closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() public editCard: ICardInterface;

  public card: ICardInterface;
  public placeholder: string;
  public htmlContent: string;

  constructor(private listComponent: ListComponent) { }

  ngOnInit(): void {
    this.htmlContent = this.editCard.titleCard;
  }

  saveCard(card: ICardInterface) {
    const cardEdit =  {
      _id: card._id,
      titleCard: this.htmlContent,
      importantCard: card.importantCard
    }
    this.listComponent.onEdit(cardEdit);
    this.closeModal.emit(false);
  }



  @HostListener('window:keyup', ['$event.keyCode'])
  public isClose(code: number = 27): void {
    if(code !== 27) {
      return;
    }
      this.closeModal.emit(false)

  }
}

