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
  @Input() list: IListInterface | undefined;
  public value: string | undefined;
  public id: string | undefined;
  public toDo: ICardInterface[] = [];
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
  }

  onAddCard() {
    this.inputShow = true;
  }

  onSend() {
    if (this.value) {
      this.subId = this.idGeneratorService.onId().subscribe(
        val => this.id = val)
      this.toDo.push(<ICardInterface>{
        title: this.value,
        id: this.id,
        important: this.important
      } );
      this.inputShow = false;
      this.value = '';
      this.id = '';
    }
    this.inputShow = false;
  }

  handleDeleteCard(id: string) {
    this.toDo = this.toDo.filter((item) => {
      return item.id !== id
    })
  }

  onDeleteList(id: string | undefined) {
    this.handleDeleteList.emit(id);
  }

  handleImportantCard(id: string) {
    this.toDo = this.toDo.map(obj =>
      obj.id === id ? { ...obj, important: true } : obj
    );
    console.log(this.toDo);
  }

  handleImportantDelete(id: string) {
    this.toDo = this.toDo.map(obj =>
      obj.id === id ? { ...obj, important: false } : obj
    );
    console.log(this.toDo);
  }

  ngOnDestroy(): void {
    if (this.subId){
      this.subId.unsubscribe()
    }
  }
}
