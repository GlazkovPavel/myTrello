import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ICardInterface} from "../../interface/card.interface";
import {IListInterface} from "../../interface/list.interface";
import { Subscription } from "rxjs";
import {IdGeneratorService} from "../../shared/services/id-generator.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ListComponent implements OnInit, OnDestroy {

  @Output() public handleDeleteList: EventEmitter<string> = new EventEmitter();
  @Output() public editSpace: EventEmitter<Event> = new EventEmitter();
  @Input() public list: IListInterface | undefined;
  @ViewChild('input') public input: ElementRef;
  public value: string | undefined;
  public id: string | undefined;
  public inputShow: boolean = false;
  public importantCard: boolean = false;
  public showEditCardModal: boolean = false;
  public editCard: ICardInterface;
  private subId: Subscription;

  constructor(private idGeneratorService: IdGeneratorService) { }

  ngOnInit(): void {}

  public drop(event: CdkDragDrop<ICardInterface[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.editSpace.emit();
  }

  public onAddCard() {
    if(this.value) {
      this.onSend();
      this.inputShow = false;
    }
    this.inputShow = true;
  }

  public onSend() {
    if (this.value) {
      this.inputShow = false;
      this.subId = this.idGeneratorService.onId().subscribe(
        val => this.id = val)
      this.list.card.push(<ICardInterface>{
        titleCard: this.value,
        _id: this.id,
        importantCard: this.importantCard,
      } );
      this.editSpace.emit()

      this.value = '';
      this.id = '';
    }
    this.inputShow = false;
  }

  public onSendInput() {
    if (this.list?.titleList === this.input.nativeElement.value) {
      return;
    }
    this.list.titleList = this.input.nativeElement.value
    this.editSpace.emit();
  }

  public handleDeleteCard(id: string) {
    this.list.card = this.list.card.filter((item) => {
      return item._id !== id
    });
    this.editSpace.emit();
  }

  public onDeleteList(id: string | undefined) {
    this.handleDeleteList.emit(id);
  }

  public handleImportantCard(id: string) {
    this.list.card = this.list.card.map(obj =>
      obj._id === id ? { ...obj, importantCard: true } : obj
    );
    this.editSpace.emit()
  }

  public handleImportantDelete(id: string) {
    this.list.card = this.list.card.map(obj =>
      obj._id === id ? { ...obj, importantCard: false } : obj
    );
    this.editSpace.emit()
  }

  ngOnDestroy(): void {
    if (this.subId){
      this.subId.unsubscribe()
    }
  }

  public onEdit(cardEdit: ICardInterface) {
    this.list.card = this.list?.card.map(obj =>
      obj._id === cardEdit._id ? { ...obj, titleCard: cardEdit.titleCard } : obj
    );
    this.editSpace.emit()
  }

  public closeModal($event: boolean) {
    this.showEditCardModal = $event;
  }

  public showEditCard($event: boolean) {
    this.showEditCardModal = $event;
  }
}
