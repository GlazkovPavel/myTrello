import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
  @Input() public spacesArray: ISpaceInterface[] = [];
  //public space: ISpaceInterface;

  @Output() spaceItem:  EventEmitter<ISpaceInterface> = new EventEmitter();
  @Output() spaceCurrent:  EventEmitter<string> = new EventEmitter();
  private subId: Subscription;

  constructor(private idGeneratorService: IdGeneratorService) { }

  ngOnInit(): void {
    // this.spacesArray = JSON.parse(localStorage.getItem('spaces'));
    // console.log(this.spacesArray)
  }

  showSpace(idSpace: string){
    this.spaceCurrent.emit(idSpace);
  }

  onAddSpace() {
    if(this.value){
      this.subId = this.idGeneratorService.onId().subscribe(
        val => this.id = val);
      this.spaceItem.emit({
        title: this.value,
        id: this.id,
        list: []
      } )
      this.spacesArray.push({
        title: this.value,
        id: this.id,
        list: []
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
