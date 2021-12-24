import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {IListInterface} from "../../interface/list.interface";
import {Subscription} from "rxjs";
import {IdGeneratorService} from "../../shared/services/id-generator.service";
import {ISpaceInterface} from "../../interface/space.interface";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnDestroy {
  public value: string = '';
  public id: string | undefined;
  public spacesArray: ISpaceInterface[] = [];
  //public space: ISpaceInterface;

  @Output() spaceItem:  EventEmitter<IListInterface> = new EventEmitter();
  @Output() spaceCurrent:  EventEmitter<string> = new EventEmitter();
  private subId: Subscription;
  default: any;

  constructor(private idGeneratorService: IdGeneratorService) { }

  ngOnInit(): void {}

  showSpace(id: string){
    debugger
    console.log(id)
      //const space = this.spacesArray.find(item => item.id === id);
    //console.log(space)
    this.spaceCurrent.emit(id);
  }

  onAddSpace() {
    if(this.value){
      this.subId = this.idGeneratorService.onId().subscribe(
        val => this.id = val);
      this.spaceItem.emit({
        title: this.value,
        id: this.id
      } )
      this.spacesArray.push({
        title: this.value,
        id: this.id
      })

      this.id = '';
      this.value = '';

      console.log(this.spacesArray)
    }
    return;
  }

  ngOnDestroy(): void {
    if (this.subId){
      this.subId.unsubscribe()
    }
  }
}
