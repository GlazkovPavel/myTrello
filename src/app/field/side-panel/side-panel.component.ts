import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {IListInterface} from "../../interface/list.interface";
import {Subscription} from "rxjs";
import {IdGeneratorService} from "../../shared/services/id-generator.service";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnDestroy {
  public value: string = '';
  public id: string | undefined;
  public spaces: { title: string; id: string; }[] = []

  @Output() spaceItem:  EventEmitter<IListInterface> = new EventEmitter();
  private subId: Subscription;

  constructor(private idGeneratorService: IdGeneratorService) { }

  ngOnInit(): void {}

  onAddSpace() {
    this.subId = this.idGeneratorService.onId().subscribe(
      val => this.id = val);
    this.spaceItem.emit({
      title: this.value,
      id: this.id
    } )
    this.spaces.push({
      title: this.value,
      id: this.id
    })

    this.id = '';
    this.value = '';

    console.log(this.spaces)
  }

  ngOnDestroy(): void {
    if (this.subId){
      this.subId.unsubscribe()
    }
  }
}
