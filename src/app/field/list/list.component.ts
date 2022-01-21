import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ICardInterface} from "../../interface/card.interface";
import {IListInterface} from "../../interface/list.interface";
import { Subscription } from "rxjs";
import {IdGeneratorService} from "../../shared/services/id-generator.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  @Output() handleDeleteList: EventEmitter<string> = new EventEmitter();
  @Output() editSpace: EventEmitter<Event> = new EventEmitter();
  @Input() list: IListInterface | undefined;
  public value: string | undefined;
  public id: string | undefined;
  public inputShow: boolean = false;
  public important: boolean = false;
  private subId: Subscription;

  constructor(private idGeneratorService: IdGeneratorService) { }

  ngOnInit(): void {}

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
    this.inputShow = true;
  }

  onSend() {
    if (this.value) {
      this.subId = this.idGeneratorService.onId().subscribe(
        val => this.id = val)
      this.list.card.push(<ICardInterface>{
        titleCard: this.value,
        idCard: this.id,
        importantCard: this.important,
      } );
      this.editSpace.emit()
      this.inputShow = false;
      this.value = '';
      this.id = '';
    }
    this.inputShow = false;
  }

  handleDeleteCard(id: string) {
    this.list.card = this.list.card.filter((item) => {
      return item.idCard !== id
    });
    this.editSpace.emit();
  }

  onDeleteList(id: string | undefined) {
    this.handleDeleteList.emit(id);
  }

  handleImportantCard(id: string) {
    this.list.card = this.list.card.map(obj =>
      obj.idCard === id ? { ...obj, important: true } : obj
    );
    this.editSpace.emit()
  }

  handleImportantDelete(id: string) {
    this.list.card = this.list.card.map(obj =>
      obj.idCard === id ? { ...obj, important: false } : obj
    );
    this.editSpace.emit()
  }

  ngOnDestroy(): void {
    if (this.subId){
      this.subId.unsubscribe()
    }
  }

}
