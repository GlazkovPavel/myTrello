import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ICardInterface} from "../../interface/card.interface";
import {IListInterface} from "../../interface/list.interface";
import { Subscription } from "rxjs";
import {IdGeneratorService} from "../../shared/services/id-generator.service";
import {ModalService} from "../../modal/modal.service";
import {FieldComponent} from "../field.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ListComponent implements OnInit, OnDestroy {

  @Output() handleDeleteList: EventEmitter<string> = new EventEmitter();
  @Output() editSpace: EventEmitter<Event> = new EventEmitter();
  @Input() list: IListInterface | undefined;
  public value: string | undefined;
  public id: string | undefined;
  public inputShow: boolean = false;
  public importantCard: boolean = false;
  private subId: Subscription;

  constructor(private idGeneratorService: IdGeneratorService,
              private modalService: ModalService,
              private fieldService: FieldComponent) { }

  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<ICardInterface[], any>) {
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

  onAddCard() {
    if(this.value) {
      this.onSend();
      this.inputShow = false;
    }
    this.inputShow = true;
  }

  //onEdit(card: ICardInterface){

    //
    // setTimeout(() => {
    //   this.list.card = this.list.card.map(obj =>
    //     obj._id === card._id ? { ...obj, titleCard: card.titleCard } : obj
    //   );
    // }, 0)

    //localStorage.setItem('cardEdit', JSON.stringify(card))
    //this.editSpace.emit()
  //}

  onSend() {
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

  handleDeleteCard(id: string) {
    this.list.card = this.list.card.filter((item) => {
      return item._id !== id
    });
    this.editSpace.emit();
  }

  onDeleteList(id: string | undefined) {
    this.handleDeleteList.emit(id);
  }

  handleImportantCard(id: string) {
    this.list.card = this.list.card.map(obj =>
      obj._id === id ? { ...obj, importantCard: true } : obj
    );
    this.editSpace.emit()
  }

  handleImportantDelete(id: string) {
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

}
