import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IListInterface} from "../../interface/list.interface";
import { Subscription } from "rxjs";
import {IdGeneratorService} from "../../shared/services/id-generator.service";

@Component({
  selector: 'app-list-default',
  templateUrl: './list-default.component.html',
  styleUrls: ['./list-default.component.scss', '../list/list.component.scss']
})
export class ListDefaultComponent implements OnInit, OnDestroy {
  public value: string = '';
  public id: string | undefined;

  @Output() listItem:  EventEmitter<IListInterface> = new EventEmitter();
  private subId: Subscription;

  constructor(private idGeneratorService: IdGeneratorService) { }

  ngOnInit(): void {}

  onAddList() {
    this.subId = this.idGeneratorService.onId().subscribe(
      val => this.id = val);
    this.listItem.emit({
      title: this.value,
      id: this.id
    } )
    this.id = '';
    this.value = '';
  }

  ngOnDestroy(): void {
    if (this.subId){
      this.subId.unsubscribe()
    }
  }
}
